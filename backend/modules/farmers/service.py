from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from middleware.auth import decode_jwt_token
from utils.hashing import hash_password, verify_password
from .repository import (
    get_userProfile,
    get_username_l,
    check_user_by_email,
    UpdateEmail,
    UpdatePhoneNumber,
    UpdateFarmname,
    UpdatePassword,
)
from config.audit.logger import get_logger

logger = get_logger("FARMER")


async def get_username(db: AsyncSession, current_user):

    user_data = await get_username_l(db, current_user.email)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    username, farmname = user_data
    return {"username": username, "farmname": farmname}


async def farmUser(db: AsyncSession, current_user):

    results = await get_userProfile(db, current_user.email)
    if not results:
        raise HTTPException(status_code=404, detail="User not found")

    return results


async def update_email(db: AsyncSession, payload, current_user):
    existing_user = await check_user_by_email(db, payload.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use"
        )

    await UpdateEmail(db, current_user.id, payload.email)

    return {"message": "Email updated successfully"}


async def update_phone(db: AsyncSession, payload, current_user):
    await UpdatePhoneNumber(db, current_user.id, payload.phonenumber)

    return {"message": "Phone number updated successfully"}


async def update_farmname(db: AsyncSession, payload, current_user):
    await UpdateFarmname(db, current_user.id, payload.farmname)

    return {"message": "Farm name updated successfully"}


async def update_password(db: AsyncSession, payload, current_user):
    user = await get_userProfile(db, current_user.email)

    # Verify old password
    if not verify_password(payload.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect old password"
        )

    # Hash new password
    new_hashed_password = hash_password(payload.new_password)

    await UpdatePassword(db, user.id, new_hashed_password)

    return {"message": "Password updated successfully"}
