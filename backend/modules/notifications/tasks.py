from message_broker.config import celery_bus
from modules.notifications.providers.map import CHANNEL_MAP
from .schemas import NotificationPayload
import asyncio


@celery_bus.task(name="modules.notifications.tasks.send_notification_task")
def send_notification_task(payload: dict, channel: str):
    sender = CHANNEL_MAP.get(channel)

    if not sender:
        return False

    try:
        data = NotificationPayload(**payload)
        # run async function inside celery
        result = asyncio.run(sender(data))

        return result

    except Exception as e:
        return False
