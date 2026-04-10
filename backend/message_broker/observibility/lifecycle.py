from message_broker.status import sync_set_task_status
from .metric import (
    sync_increment_queue,
    sync_decrement_queue,
    sync_increment_processing,
    sync_decrement_processing,
)
from message_broker.redis import redis_client
from message_broker.key import task_timeline_key
import asyncio


def record_timeline(task_id: str, state: str):
    asyncio.run(
        redis_client.rpush(task_timeline_key(task_id), state)
    )


def on_task_queued(task_id: str, queue: str):
    sync_set_task_status(task_id, "queued")
    sync_increment_queue(queue)
    record_timeline(task_id, "queued")


def on_task_started(task_id: str, queue: str):
    sync_set_task_status(task_id, "processing")
    sync_decrement_queue(queue)
    sync_increment_processing(queue)
    record_timeline(task_id, "processing")


def on_task_completed(task_id: str, queue: str):
    sync_set_task_status(task_id, "completed")
    sync_decrement_processing(queue)
    record_timeline(task_id, "completed")


def on_task_failed(task_id: str, queue: str):
    sync_set_task_status(task_id, "failed")
    sync_decrement_processing(queue)
    record_timeline(task_id, "failed")