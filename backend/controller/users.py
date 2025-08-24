from fastapi import APIRouter, Request,HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.postgre_db import get_db
from services.user import get_userProfile
from middleware.auth import decode_jwt_token

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





