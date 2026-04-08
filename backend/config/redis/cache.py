import json
from typing import Any, Optional
from redis.asyncio import Redis
from .client import get_redis


DEFAULT_TTL = 60 


async def set_cache(key: str, value: Any, ttl: int = DEFAULT_TTL):
    redis: Redis = get_redis()
    await redis.set(key, json.dumps(value), ex=ttl)


async def get_cache(key: str) -> Optional[Any]:
    redis: Redis = get_redis()
    data = await redis.get(key)

    if data:
        return json.loads(data)

    return None


async def delete_cache(key: str):
    redis: Redis = get_redis()
    await redis.delete(key)