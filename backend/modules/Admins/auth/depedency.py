from fastapi import Depends, HTTPException, status, Request
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from config.database import get_db
from .model import Admin  # Ensure path is correct
from config.setting import get_settings

settings = get_settings()


async def get_current_admin(
    request: Request, db: AsyncSession = Depends(get_db)
) -> Admin:
    # 1. Extract token from Cookie
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    try:
        # 2. Decode the JWT
        payload = jwt.decode(
            token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")
        role: str = payload.get("role")

        if email is None or role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FOR_VALIDATION,
                detail="Invalid credentials or insufficient permissions",
            )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    # 3. Fetch Admin from Database
    query = select(Admin).where(Admin.email == email)
    result = await db.execute(query)
    admin = result.scalar_one_or_none()

    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Admin user not found"
        )

    return admin
