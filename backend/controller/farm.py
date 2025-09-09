from fastapi import APIRouter, HTTPException, Depends, Response, Request
from db.postgre_db import get_db
from model.farming import Register_cow
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session
from datetime  import datetime, timedelta

router =  APIRouter()


@router.post("/farming/dairycows")
async def register_cow(payload: Register_cow, db: AsyncSession = Depends(get_db)):
    body = payload()

    farm_cow ={
        "name": payload.cowname,
    }


@router.post("farming/goats")
async def register_goats():
    body = 