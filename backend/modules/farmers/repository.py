from datetime import datetime

from sqlalchemy import text, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from modules.auth.models import Users
from sqlalchemy.dialects.postgresql import UUID


async def get_userProfile(db: AsyncSession, email: str):
    result = await db.execute(
        select(
            Users.id, Users.username, Users.farmname, Users.email, Users.phonenumber
        ).where(Users.email == email)
    )
    row = result.first()
    if not row:
        return None

    return {
        "id": row.id,
        "username": row.username,
        "farmname": row.farmname,
        "email": row.email,
        "phonenumber": row.phonenumber,
    }


async def get_username_l(db: AsyncSession, email: str):
    result = await db.execute(select(Users.username).where(Users.email == email))
    return result.scalar()


async def check_user_by_email(db: AsyncSession, email: str):

    result = await db.execute(select(Users).where(Users.email == email))
    return result.scalar_one_or_none()


async def UpdateEmail(db: AsyncSession, user_id: UUID, new_email: str):
    await db.execute(update(Users).where(Users.id == user_id).values(email=new_email))
    await db.commit()


async def UpdatePhoneNumber(db: AsyncSession, user_id: UUID, new_phone: str):
    await db.execute(
        update(Users).where(Users.id == user_id).values(phonenumber=new_phone)
    )
    await db.commit()


async def UpdateFarmname(db: AsyncSession, user_id: UUID, new_farmname: str):
    await db.execute(
        update(Users).where(Users.id == user_id).values(farmname=new_farmname)
    )
    await db.commit()


async def UpdatePassword(db: AsyncSession, user_id: UUID, new_password: str):
    await db.execute(
        update(Users).where(Users.id == user_id).values(password=new_password)
    )
    await db.commit()
