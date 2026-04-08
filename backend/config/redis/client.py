from redis.asyncio import Redis
from config.setting import get_settings

settings = get_settings()

redis : Redis | None = None

async def init_redis():
    global redis

    redis =  await Redis.from_url(
        settings.REDIS_URL_CACHE,
        decode_responses=True,
    )

    await redis.ping()

async def close_redis():
    global redis

    if redis:
        await redis.close()
        redis = None

def get_redis() -> Redis:
    if not redis:
        raise RuntimeError("Redis client is not initialized. Call init_redis() first.")
    return redis
