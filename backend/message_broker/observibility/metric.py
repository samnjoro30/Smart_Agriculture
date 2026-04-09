from broker.redis import redis_client
from broker.keys import queue_count_key, queue_processing_key
import asyncio


# ASYNC

async def increment_queue(queue: str):
    await redis_client.incr(queue_count_key(queue))


async def decrement_queue(queue: str):
    await redis_client.decr(queue_count_key(queue))


async def increment_processing(queue: str):
    await redis_client.incr(queue_processing_key(queue))


async def decrement_processing(queue: str):
    await redis_client.decr(queue_processing_key(queue))


async def get_queue_metrics(queue: str):
    queued = await redis_client.get(queue_count_key(queue))
    processing = await redis_client.get(queue_processing_key(queue))

    return {
        "queue": queue,
        "queued": int(queued or 0),
        "processing": int(processing or 0),
    }

# SYNC (Celery safe)
def sync_increment_queue(queue: str):
    asyncio.run(increment_queue(queue))


def sync_decrement_queue(queue: str):
    asyncio.run(decrement_queue(queue))


def sync_increment_processing(queue: str):
    asyncio.run(increment_processing(queue))


def sync_decrement_processing(queue: str):
    asyncio.run(decrement_processing(queue))