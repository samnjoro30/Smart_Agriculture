from fastapi import APIRouter, Request,HTTPException, Depends
from db.postgre_db import get_db
from services.user import get_userProfile
from middleware.auth import decode_jwt_token

app = APIRouter()

@app.get("/users/userprofile")
async def users(request: Request, db: AsyncSession=Depends(get_db)):
    auth = request.headers.get("Authorization")

    if not auth or auth.startwith("Bearer"):
        HTTPException(status_code=401, details="Token not authorized to access user details logout and login again")

    token = auth.split[''][1]
    payload = decode_jwt_token(token)

    if not payload or "email" not in payload:
        HTTPException(status_code=402, details="Token expired logout and login again")
    
    email = payload['email']
    results = await get_userProfile(db, email)

    if not results:
        raise HTTPException(status_code=404, detail="User not found")

    return {"user": dict(results)}





