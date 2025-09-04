from fastapi import APIRouter, Request,HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.postgre_db import get_db
from services.auth import get_user_by_email
from services.user import get_userProfile, check_user_by_email, UpdateEmail, UpdatePhoneNumber, UpdateFarmname, UpdatePassword  
from middleware.auth import decode_jwt_token
from model.user import ChangeEmail, ChangeFarmname, ChangePassword, ChangePhonenumber
from utils.hashing import verify_password, hash_password

app = APIRouter()

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No access token found")
    payload = decode_jwt_token(token)
    if not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Token expired")
    return payload["sub"]

# farmer profile setting
@app.get("/users/userprofile")
async def users(request: Request, db: AsyncSession=Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No access token found in cookies")

    payload = decode_jwt_token(token)
    email = payload.get("sub")

    if not email:
        raise HTTPException(status_code=401, detail="Token expired logout and login again")
    
    results = await get_userProfile(db, email)

    if not results:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": dict(results)}


@app.put("/users/update-email")
async def update_email(request: ChangeEmail, db: AsyncSession = Depends(get_db), req: Request = None):
    email = get_current_user(req)
    user = await get_user_by_email(email, db)

    if await check_user_by_email(request.email, db):
        raise HTTPException(status_code=400, detail="Email already in use")

    await UpdateEmail(user.id, request.email, db)
    return {"message": "Email updated successfully"}


@app.put("/users/update-phonenumber")
async def update_phone(request: ChangePhonenumber, db: AsyncSession = Depends(get_db), req: Request = None):
    email = get_current_user(req)
    user = await get_user_by_email(email, db)

    await UpdatePhoneNumber(user.id, request.phonenumber, db)
    return {"message": "Phone number updated successfully"}


@app.put("/users/update-farmname")
async def update_farm(request: ChangeFarmname, db: AsyncSession = Depends(get_db), req: Request = None):
    email = get_current_user(req)
    user = await get_user_by_email(email, db)

    await UpdateFarmname(user.id, request.farmname, db)
    return {"message": "Farm name updated successfully"}


@app.put("/users/update-password")
async def update_password(request: ChangePassword, db: AsyncSession = Depends(get_db), req: Request = None):
    email = get_current_user(req)
    user = await get_user_by_email(email, db)

    if not verify_password(request.old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    new_hashed_pw = hash_password(request.new_password)
    await UpdatePassword(user.id, new_hashed_pw, db)
    return {"message": "Password updated successfully"}

# getting farmer weekly notification incoming updates
@app.get("/users/notification")
async def farmer_week_notification(request: Request, db: AsyncSession = Depends(get_db)):
    email = get_current_user(request)


