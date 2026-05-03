from .redis import redis_client
from .keys import task_status_key, task_meta_key
import asyncio

TASK_TTL = 3600


# used async for async workers in fastapi
async def set_task_status(task_id: str, status: str):
    await redis_client.set(task_status_key(task_id), status, ex=TASK_TTL)


async def get_task_status(task_id: str):
    result = await redis_client.get(task_status_key(task_id))
    return result or "PENDING"


async def set_task_meta(task_id: str, data: dict):
    await redis_client.hset(task_meta_key(task_id), mapping=data)
    await redis_client.expire(task_meta_key(task_id), TASK_TTL)


async def get_task_meta(task_id: str):
    return await redis_client.hgetall(task_meta_key(task_id))


async def set_task_status(task_id: str, status: str):
    await redis_client.set(task_status_key(task_id), status, ex=TASK_TTL)


async def get_task_status(task_id: str):
    result = await redis_client.get(task_status_key(task_id))
    return result or "PENDING"


# have use sync due to celery worker is sync and we want to avoid blocking the event loop
async def set_task_meta(task_id: str, data: dict):
    await redis_client.hset(task_meta_key(task_id), mapping=data)
    await redis_client.expire(task_meta_key(task_id), TASK_TTL)


async def get_task_meta(task_id: str):
    return await redis_client.hgetall(task_meta_key(task_id))
