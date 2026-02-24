from contextlib import asynccontextmanager
from fastapi import FastAPI
from .logger import get_logger
from .redis import init_redis, close_redis

logger = get_logger("LIFESPAN")


@asynccontextmanager
async def Lifespan(app: FastAPI):
    logger.info("server Up")

    await init_redis()
    logger.info("Redis connection established")

    yield
    logger.info("Redis server Down")

    await close_redis()
