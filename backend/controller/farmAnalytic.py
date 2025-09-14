
from sqlalchemy.ext.asyncio import AsyncSession
from db.postgre_db import get_db
from fastapi import APIRouter, Depends, HTTPException, Request
from middleware.auth import decode_jwt_token

router = APIRouter()

def FarmDataCollection():





@router.get("/farm/visualization")
async def FarmAnalysis(request: Request, db: AsyncSession = Depends(get_db)):
    Encrypted_user = request.cookies.get("access_token")

    decrypted_user = decode_jwt_token(Encryted_user)
    email = payload.get("sub")

    if not email:
        raise HTTPException(status_code=401, detail='token expired logout and login again')
    
    data = await get_farmData(email, db)

    if not data:
        raise HTTPException(status_code=401, detail='user not found')
    
    return {
        "message": dict(data)
    }



