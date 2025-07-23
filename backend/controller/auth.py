from fastapi import APIRouter, HTTPException, Depends, Response
from model.auth import  RegisterRequest
from db.postgre_db import get_db
from services.auth import create_user, get_user_by_username
from utils.jwt import create_access_token
from utils.hashing import hash_password
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session

router =  APIRouter()

@router.post("/auth/login", response_model=Token)


@router.post("/auth/register", status_code= HTTP_201_CREATED)
async def register_farm(payload: RegisterRequest, db: AsyncSession = Depends(get_db) ):
    # if payload.password != payload.confirmPassword:
    #     raise HTTPException(status_code=400, detail="Passwords do not match")
    # existing_user = get_user_by_username(payload.username)
    # if existing_user:
    #     raise HTTPException(status_code=409, detail="Username already exists")
    
    hashed_pw = hash_password(payload.password)

    user_dict = {
        "username": payload.username,
        "email": payload.email,
        "farmname": payload.farmname,
        "phonenumber": payload.phonenumber,
        "password": hashed_pw,
    }

    await create_user(user_dict, db)
    return {"message": "User registered successfully"}  