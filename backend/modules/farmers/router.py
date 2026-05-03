from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config.audit.logger import get_logger
from config.database import get_db

from .service import (
    farmUser,
    get_username,
    update_email,
    update_phone,
    update_farmname,
    update_password,
)
from config.security import get_current_user
from .schemas import (
    ChangeEmail,
    ChangeFarmname,
    ChangePhonenumber,
    ChangePassword,
)

router = APIRouter(prefix="/farm", tags=["Farmers"])

logger = get_logger("FARMER")


@router.get("/farm-profile")
async def get_farm_profile(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):
    farmer = await farmUser(db, current_user)
    return farmer


@router.get("/username")
async def get_username_letters(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):

    username = await get_username(db, current_user)
    return {"username": username}


@router.put("/update-email")
async def update_farmer_email(
    payload: ChangeEmail,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await update_email(db, payload, current_user)


@router.put("/update-farmname")
async def update_farmer_farmname(
    payload: ChangeFarmname,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await update_farmname(db, payload, current_user)


@router.put("/update-password")
async def update_farmer_password(
    payload: ChangePassword,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await update_password(db, payload, current_user)


@router.put("/update-phonenumber")
async def update_farmer_phonenumber(
    payload: ChangePhonenumber,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await update_phone(db, payload, current_user)
