
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from config.audit.logger import get_logger


from .models import (
    Feeds,
)

from .repository import (
        create_feed,
        get_all_feeds,
        get_feed_by_id,
        update_feed,
        delete_feed,
)

logger = het_logger("NUTRITION")

async def create_feed_service(db: AsyncSession, feed_data: dict, user_id):


async def get_all_feeds_service(db: AsyncSession, user_id):

async def update_feed_service(db: AsyncSession, feed_id, user_id, data):

async def delete_feed_service(db: AsyncSession, feed_id, user_id):