from asyncio.redis import Redis
from .setting import get_settings

settings = get_settings()

redis : Redis | None = None

async def init_redis():
    global redis

    redis =  await Redis.from_url(
        settings.REDIS_URL,
        decode_responses=True,
    )

    await redis.ping()

async def close_redis():
    if redis:
        await redis.close()


def get_redis() -> Redis:
    return redis
