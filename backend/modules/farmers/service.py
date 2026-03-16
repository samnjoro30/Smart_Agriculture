from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from middleware.auth import decode_jwt_token
from .repository import get_userProfile

async def farmUser(db: AsyncSession, current_user):

    results = await get_userProfile(db, current_user.email)
    if not results:
        raise HTTPException(status_code=404, detail="User not found")

    await db.commit()

    return results

# @app.put("/users/update-email")
# async def update_email(
#     request: ChangeEmail, db: AsyncSession = Depends(get_db), req: Request = None
# ):
#     email = get_current_user(req)
#     user = await get_user_by_email(email, db)

#     if await check_user_by_email(request.email, db):
#         raise HTTPException(status_code=400, detail="Email already in use")

#     await UpdateEmail(user.id, request.email, db)
#     return {"message": "Email updated successfully"}


# @app.put("/users/update-phonenumber")
# async def update_phone(
#     request: ChangePhonenumber, db: AsyncSession = Depends(get_db), req: Request = None
# ):
#     email = get_current_user(req)
#     user = await get_user_by_email(email, db)

#     await UpdatePhoneNumber(user.id, request.phonenumber, db)
#     return {"message": "Phone number updated successfully"}


# @app.put("/users/update-farmname")
# async def update_farm(
#     request: ChangeFarmname, db: AsyncSession = Depends(get_db), req: Request = None
# ):
#     email = get_current_user(req)
#     user = await get_user_by_email(email, db)

#     await UpdateFarmname(user.id, request.farmname, db)
#     return {"message": "Farm name updated successfully"}


# @app.put("/users/update-password")
# async def update_password(
#     request: ChangePassword, db: AsyncSession = Depends(get_db), req: Request = None
# ):
#     email = get_current_user(req)
#     user = await get_user_by_email(email, db)

#     if not verify_password(request.old_password, user.password):
#         raise HTTPException(status_code=400, detail="Old password is incorrect")

#     new_hashed_pw = hash_password(request.new_password)
#     await UpdatePassword(user.id, new_hashed_pw, db)
#     return {"message": "Password updated successfully"}
