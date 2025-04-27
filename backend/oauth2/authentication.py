from django.utils.dateparse import parse_datetime
from django.utils import timezone
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from utils.mongo import db_manager

user_collection = db_manager.user_collection()


class MongoUser:
    def __init__(self, data):
        self._data = data

    @property
    def is_authenticated(self):
        # DRF needs this to be truthy
        return True

    @property
    def id(self):
        # so request.user.id works
        return str(self._data.get("_id"))

    @property
    def username(self):
        return self._data.get("username")


class JWTAuthentication(BaseAuthentication):
    """
    DRF Authentication class that:
    - Reads 'Authorization: Bearer <token>' header
    - Validates it against Google’s userinfo endpoint
    - Returns (user, token) if valid
    """

    def authenticate(self, request):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return None

        token = auth.split(" ", 1)[1].strip()
        if not token:
            raise exceptions.AuthenticationFailed("Empty access token")

        # find the user whose oauth.access_token matches
        user_data = user_collection.find_one({"oauth.access_token": token})
        if not user_data:
            raise exceptions.AuthenticationFailed("Invalid access token")

        expiry_str = user_data.get("oauth", {}).get("token_expiry")
        if expiry_str:
            expiry_dt = parse_datetime(expiry_str)
            if expiry_dt is None:
                raise exceptions.AuthenticationFailed("Invalid expiry format")

            if timezone.is_naive(expiry_dt):
                expiry_dt = timezone.make_aware(
                    expiry_dt, timezone.get_current_timezone()
                )

            if expiry_dt < timezone.now():
                raise exceptions.AuthenticationFailed("Access token has expired")

        # wrap in a user-like object for DRF
        user = MongoUser(user_data)
        return (user, token)

    def authenticate_header(self, request):
        return "Bearer"
