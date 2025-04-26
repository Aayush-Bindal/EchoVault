from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from utils.jwt_utils import verify_jwt


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
            raise exceptions.AuthenticationFailed(
                "Invalid Authentication"
            )  # we’re not handling this request

        token = auth.split(" ", 1)[1].strip()
        if not token:
            raise exceptions.AuthenticationFailed("Empty Bearer token")

        payload = verify_jwt(token)
        if not payload:
            raise exceptions.AuthenticationFailed("Invalid or expired token")

        # If we want email and username tag, that is already
        # presesnt in payload, so to get email do payload['email']
        request.user = payload

        return payload, token

    def authenticate_header(self, request):
        return "Bearer"
