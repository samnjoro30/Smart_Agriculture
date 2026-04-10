from fastapi import APIRouter

from message_broker.redis import redis_client

router = APIRouter(prefix="/admin/metrics", tags=["metrics"])

@router.get("/queues/{queue}")
async def queue_metrics(queue: str):
    return await get_queue_metrics(queue)


@router.get("/tasks/{task_id}/timeline")
async def task_timeline(task_id: str):
    return await redis_client.lrange(task_timeline_key(task_id), 0, -1)