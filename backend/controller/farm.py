from fastapi import APIRouter, HTTPException, Depends, Response, Request
from db.postgre_db import get_db
from model.farming import Register_cow
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from sqlalchemy.orm import Session
from datetime  import datetime, timedelta
from services.farmInput import create_cow

router =  APIRouter()


@router.post("/farming/dairycows")
async def register_cow(payload: Register_cow, db: AsyncSession = Depends(get_db)):
    farm_cow ={
        "cowname": payload.cowname,
        "cowage": payload.age,
        "cowlastBirth": payload.lastBirth,
        "lastMate": payload.lastMate,
        "calf": payload.calf,
    }

    await create_cow(farm_cow, db)

    return {
        "message" : "Cows registered successfully"
    }


def create_notification(db: Session, user_id: int, message: str):

    # Placeholder function to create a notification in the database
    pass

@router.get("/farm/notification")
async def get_notifications(request: Request, db: AsyncSession = Depends(get_db)):
    