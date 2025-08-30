from fastapi import APIRouter, Request,HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.postgre_db import get_db
from services.user import get_userProfile, check_user_by_email, UpdateEmail, UpdatePhoneNumber 
from middleware.auth import decode_jwt_token
from model.user import ChangeEmail, ChangeFarmname, ChangePassword, ChangePhonenumber

app = APIRouter()

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
async def usersProfileEmail(request: ChangeEmail, db: AsyncSession=Depends(get_db)):
    body = await check_user_by_email(request.email)
    if body:
        raise HTTPException(status_code=401, detail="email already in use")
    
    await UpdateEmail(email, db)

    return {"message": "Email updated succesfully"}

@app.put("/users/update-phonenumber")
async def usersProfilePhonenumber(request: ChangeEmail, db: AsyncSession=Depends(get_db)):
    body = request.json()

    if body:
        raise HTTPException(status_code=401, detail="phonenumber already in use")
    
    await UpdatePhoneNumber(phonenumber, db)

    return {"message": "phone number updated successfully"}











