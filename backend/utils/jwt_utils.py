import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from os import getenv

load_dotenv()

SECRET_KEY: str = getenv("JWT_SECRET_KEY", "")
ALGORITHM = "HS256"
EXPIRATION_MINUTES = 60

assert SECRET_KEY is not None, "JWT IS EMPTY"


def generate_jwt(payload):
    expiry = datetime.utcnow() + timedelta(minutes=EXPIRATION_MINUTES)
    payload.update({"exp": expiry})
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_jwt(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
