import requests
from os import path
from django.conf import settings
from django.urls import reverse
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from datetime import timedelta
from google_auth_oauthlib.flow import Flow

from utils.mongo import db_manager
from utils.jwt_utils import generate_jwt

CLIENT_SECRETS = path.join(path.dirname(__file__), "client_secrets.json")
assert CLIENT_SECRETS is not None, "Client Secrets file is missing"

users_collection = db_manager.user_collection()


class GoogleAuthCallbackView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        code = request.GET.get("code")
        if not code:
            return Response({"error": "Authorization code not found"}, status=400)

        try:
            redirect_uri = request.build_absolute_uri(reverse("oauth2:callback"))
            flow = Flow.from_client_secrets_file(
                client_secrets_file=CLIENT_SECRETS,
                scopes=settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE,
                redirect_uri=redirect_uri,
            )
            flow.fetch_token(code=code)
            credentials = flow.credentials

            access_token = credentials.token
            refresh_token = credentials.refresh_token
            token_expiry = (
                credentials.expiry
                if credentials.expiry
                else timezone.now() + timedelta(hours=1)
            )

            # Get user info
            userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
            headers = {"Authorization": f"Bearer {access_token}"}
            response = requests.get(userinfo_url, headers=headers)
            response.raise_for_status()
            user_data = response.json()

            email = user_data.get("email")
            if not email:
                return Response(
                    {"error": "Email not found in Google profile"}, status=400
                )

            user = users_collection.find_one({"email": email})

            if not user:
                username = f"google_{email.split('@')[0]}"
                counter = 1
                while users_collection.find_one({"username": username}):
                    username = f"{username}_{counter}"
                    counter += 1

                user = {
                    "username": username,
                    "email": email,
                    "first_name": user_data.get("given_name", ""),
                    "last_name": user_data.get("family_name", ""),
                    "oauth": {
                        "provider": "google",
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "token_expiry": token_expiry.isoformat(),
                    },
                }
                users_collection.insert_one(user)
            else:
                users_collection.update_one(
                    {"email": email},
                    {
                        "$set": {
                            "oauth.access_token": access_token,
                            "oauth.refresh_token": refresh_token,
                            "oauth.token_expiry": token_expiry.isoformat(),
                        }
                    },
                )

            # Now generate JWT token
            payload = {"user_id": str(user["_id"]), "email": user["email"]}
            jwt_token = generate_jwt(payload)

            return Response(
                {"jwt": jwt_token, "user": user["username"], "email": user["email"]},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GoogleLoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        """
        Return the Google OAuth2 login URL for the frontend to redirect to
        """

        redirect_uri = request.build_absolute_uri(reverse("oauth2:callback"))
        flow = Flow.from_client_secrets_file(
            client_secrets_file=CLIENT_SECRETS,
            scopes=settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE,
        )
        flow.redirect_uri = redirect_uri

        authorization_url, state = flow.authorization_url(
            access_type="offline", include_granted_scopes="true", prompt="consent"
        )

        return Response({"login_url": authorization_url}, status=status.HTTP_200_OK)
