from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from db.postgre_db import get_db
from model.auth import adminLoginRequest, adminRegisterRequest
from services.admin.auth import create_admin, get_admin_by_email
from utils.hashing import hash_password, verify_password

router = APIRouter()


@router.post("/admin/register")
async def admin_register(
    payload: adminRegisterRequest, db: AsyncSession = Depends(get_db)
):
    existing = await get_admin_by_email(payload.email)
    if existing:
        raise HTTPException(
            status_code=409, detail="Admin with this email already exists"
        )

    hash_new_password = hash_password(payload.newPassword)
    admin_dict = {
        "username": payload.username,
        "email": payload.email,
        "password": hash_new_password,
        "role": payload.role,
    }
    await create_admin(admin_dict)

    return {"message": "Admin registration endpoint"}


@router.post("/admin/login")
async def admin_login(
    payload: adminLoginRequest, response: Response, db: AsyncSession = Depends(get_db)
):
    admin = await get_admin_by_email(payload.email, db)

    if not admin or not verify_password(payload.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # token = create_admin_token({"sub": admin["email"], "role": admin["role"]})

    # You can use cookies or just return the token.
    response.set_cookie(
        key="admin_access_token",
        # value=token,
        httponly=True,
        secure=True,
        samesite="none",
    )

    return {"message": "Login successful"}  # "token": token, "role": admin["role"]


@router.post("/admin/logout")
async def admin_logout(response: Response, request: Request):
    token = request.cookies.get("admin_access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No admin token found")
    response.delete_cookie(key="admin_access_token")
    return {"message": "Logout successful"}
