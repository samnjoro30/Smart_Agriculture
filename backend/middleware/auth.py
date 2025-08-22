from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

load_dotenv()

Jwt_token = os.getenv("JWT")
Algorithm = os.getenv("ALGORITHM")
Time_Expire = os.getenv("EXPIRE_TIME", "30")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def decode_jwt_token(token:str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        details = "Invalid token, expired",
        headers = { "WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return {"username": username}
    except JWTError:
        raise credentials_exception
