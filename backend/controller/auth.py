from fastapi import APIRouter, HTTPException, Depends, Response
from model.auth import LoginRequest, TokenResponse
from services.auth import get_user_by_username
from utils.jwt import create_access_token
from datetime import timedelta

router =  APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login_user(login_req: LoginRequest, response: Response):
    user = get_user_by_username(login_req.username)
    
    if not user or user.password != login_req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=3600
    )
    
    return {"token": token}

@router.post("/api/register", response_model=)
async def register_farm(user: RegisteredUser):
    