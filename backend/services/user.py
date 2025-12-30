from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


async def get_userProfile(db: AsyncSession, email: str):
    query = text(
        """
       SELECT email, username, farmname, phonenumber FROM users Where email = :email
    """
    )
    results = await db.execute(query, {"email": email})
    return results.mappings().first()


async def check_user_by_email(db: AsyncSession, email: str):
    query = text(
        """
       SELECT email FROM users WHERE email = :email
   """
    )
    results = await db.execute(query, {"email": email})
    row = results.fetchone()
    if row:
        return {"email": email}


async def UpdateEmail(user_id: int, new_email: str, db: AsyncSession):
    query = text("UPDATE users SET email = :email WHERE id = :id")
    await db.execute(query, {"email": new_email, "id": user_id})
    await db.commit()


async def UpdatePhoneNumber(user_id: int, new_phone: str, db: AsyncSession):
    query = text("UPDATE users SET phonenumber = :phone WHERE id = :id")
    await db.execute(query, {"phone": new_phone, "id": user_id})
    await db.commit()


async def UpdateFarmname(user_id: int, new_farmname: str, db: AsyncSession):
    query = text("UPDATE users SET farmname = :farmname WHERE id = :id")
    await db.execute(query, {"farmname": new_farmname, "id": user_id})
    await db.commit()


async def UpdatePassword(user_id: int, new_password: str, db: AsyncSession):
    query = text("UPDATE users SET password = :password WHERE id = :id")
    await db.execute(query, {"password": new_password, "id": user_id})
    await db.commit()
