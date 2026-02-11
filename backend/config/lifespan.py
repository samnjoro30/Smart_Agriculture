from contextlib import asynccontextmanager
from fastapi import FastAPI
from .logger import get_logger

logger = get_logger('LIFESPAN')

@asynccontextmanager
async def Lifespan(app: FastAPI):
    logger.info('server Up')