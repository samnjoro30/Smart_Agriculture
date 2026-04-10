from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
#from  .tasks import make_naive
from .model import ( 
    Livestock,
)

from .repository import (
    create_animal,
    get_animal_by_tag,
    get_animals_by_user,
    get_animal_stats,
    get_animals_details_by_user,
    get_animals_with_birthdate,
    update_animal_age,
)

from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger


logger = get_logger("LIVESTOCK")

def make_naive(dt: datetime | None):
    if dt and dt.tzinfo is not None:
        return dt.replace(tzinfo=None)
    return dt

async def register_animals(db: AsyncSession, payload, current_user):
    existing_animal = await get_animal_by_tag(db, payload.tag)
    if existing_animal:
        logger.warning(
            "Attempted to register duplicate animal",
            tag=payload.tag,
            user_id=current_user.id
        )
        raise HTTPException(status_code=400, detail="Animal with this tag already exists")

    animal_data = payload.model_dump(exclude_unset=True)
    for field in ["motherTag", "fatherTag", "inseminationType"]:
        if animal_data.get(field) == "":
           animal_data[field] = None

    animal_data["user_id"] = current_user.id
    if payload.category.lower() == "calf":
        animal_data.update({
            "heatStatus": False,
            "pregnant": False,
            "lastInsemination": None,
            "inseminationType": None
        })
    else: 
        animal_data.update({
            "birthDate": None,
            "motherTag": None,
            "fatherTag": None
        })

    animal_data["lastInsemination"] = make_naive(animal_data.get("lastInsemination"))
    animal_data["birthDate"] = make_naive(animal_data.get("birthDate"))
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

async def get_animal_by_tag_id(db: AsyncSession, tag: str, current_user):
    animal = await get_animal_by_tag(db, tag)
    if not animal:
        logger.warning(
            "Attempted to access non-existent animal by tag",
            tag=tag,
            user_id=current_user.id
        )
        raise HTTPException(status_code=404, detail="Animal not found")

    if animal.user_id != current_user.id:
        logger.warning(
            "Attempted to access animal belonging to another user",
            tag=tag,
            user_id=current_user.id
        )
        raise HTTPException(status_code=403, detail="Forbidden: You do not have access to this animal")

    return animal

async def update_livestock_ages_service(db: AsyncSession):
    current_date = datetime.utcnow()

    animals = await get_animals_with_birthdate(db)

    updated_count = 0

    for animal in animals:
        if animal.birthDate:
            birth_date = make_naive(animal.birthDate)
            delta_days = (current_date - birth_date).days

            new_age_months = int(delta_days / 30.44)

            if animal.age != delta_days:
                await update_animal_age(db, animal, new_age_months)
                updated_count += 1

    await db.commit()
     
    return updated_count