from contextlib import asynccontextmanager
from fastapi import FastAPI
import asyncio
import httpx

from config.audit.logger import get_logger
from config.redis.client import init_redis, close_redis
from config.setting import get_settings

from hooks.tasks import cleanup_dead_connections
from hooks.call import manager

logger = get_logger("LIFESPAN")

limiter = None

settings = get_settings()


@asynccontextmanager
async def Lifespan(app: FastAPI):
    logger.info("server Up")

    await init_redis()
    logger.info("Redis connection established")

    asyncio.create_task(manager.send_ping())
    asyncio.create_task(cleanup_dead_connections(manager))

    async def warm_db():
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))

    async def keep_alive():
        async with httpx.AsyncClient(timeout=5.0) as client:

            while True:
                try:
                    await client.get(
                        "https://smart-agriculture-21dt.onrender.com/ping", timeout=5
                    )
                    print("Self-ping successful")
                except Exception as e:
                    print("Self-ping failed:", e)

                await asyncio.sleep(600)

    asyncio.create_task(keep_alive())

    async def shutdown():
        await close_redis()


    yield
    logger.info("Redis server Down")

    await close_redis()
