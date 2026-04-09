from .config import celery_bus
from kombu import Queue

celery_bus.conf.task_queues = (
    Queue("default"),
    Queue("livestock_service"),
    Queue("nutrition_service"),
    Queue("identity_service"),
)
