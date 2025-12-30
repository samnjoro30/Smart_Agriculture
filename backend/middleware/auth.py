import os

from dotenv import load_dotenv
from fastapi import HTTPException
from jose import ExpiredSignatureError, JWTError, jwt

load_dotenv()

JWT_TOKEN = os.getenv("JWT")
ALGORITHM = os.getenv("ALGORITHM")
Time_Expire = os.getenv("EXPIRE_TIME", "30")


def decode_jwt_token(token: str):
    # credentials_exception = HTTPException(
    #     status_code=status.HTTP_401_UNAUTHORIZED,
    #     detail="Invalid token, expired",
    #     headers={"WWW-Authenticate": "Bearer"},
    # )
    try:
        return jwt.decode(token, JWT_TOKEN, algorithms=[ALGORITHM])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
