import os

from dotenv import load_dotenv
from fastapi import HTTPException, Request
from jose import JWTError, jwt

load_dotenv()

SECRET_KEY = os.getenv("ADMIN_JWT_SECRET")
ALGORITHM = "HS256"


async def require_admin_role(request: Request, required_role: str):
    token = request.cookies.get("admin_access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No admin token found")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role")
        if role != required_role and role != "superadmin":
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return payload

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
