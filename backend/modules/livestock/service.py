from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED

from .model import ( 
    Livestock,
)

from .repository import (
    create_animal,
    get_animal_by_tag,
    get_animals_by_user,
    get_animal_stats,
)

from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger


logger = get_logger("LIVESTOCK")

async def register_animals(db: AsyncSession, payload, current_user):
    existing_animal = await get_animal_by_tag(db, payload.tag)
    if existing_animal:
        logger.warning(
            "Attempted to register duplicate animal",
            tag=payload.tag,
            user_id=current_user.id
        )
        raise HTTPException(status_code=400, detail="Animal with this tag already exists")

    animal_data = payload.model_dump()
    animal_data["user_id"] = current_user.id
    if payload.category.lower() == "calf":
        animal_data["heatStatus"] = False
        animal_data["pregnant"] = False
        animal_data["lastInsemination"] = None
    else: 
        pass

    # animal_dict ={
    #     "tag": payload.tag,
    #     "name": payload.name,
    #     "category": payload.category,
    #     "breed": payload.breed,
    #     "heatStatus": payload.heatStatus,
    #     "pregnant": payload.pregnant,
    #     "lastInsemination": payload.lastInsemination,
    #     "age": payload.age,
    #     "healthStatus": payload.healthStatus,
    #     "user_id": current_user.id,
    # }
    animal = await create_animal(animal_data, db)

    await db.commit()

    logger.info(
        "Animal registered successfully",
        livestock_id=animal.id,
        tag=animal.tag,
        user_id=current_user.id
    )

    return animal

async def get_animals_listing(db: AsyncSession, current_user):
    animal = await get_animals_by_user(db, current_user.id)
    if not animal:
        logger.warning(
            "Attempted to access non-existent animal listing",
            user_id=current_user.id
        )
        raise HTTPException(status_code=404, detail="No animals found for this user")

    return animal

async def get_stats(db: AsyncSession, current_user):
    stats = await get_animal_stats(db, current_user.id)
    if not stats:
        logger.warning(
            "Attempted to access stats for user with no animals",
            user_id=current_user.id
        )
        raise HTTPException(status_code=404, detail="No stats found for this user")
    
    return stats
