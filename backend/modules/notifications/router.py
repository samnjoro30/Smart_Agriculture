from .repository import get_user_preferences
from .service import filter_channels
from .utils import get_recipient
from .tasks import send_notification_task
from config.security import current_user
from .model import Notification


async def notify(
    db,
    user: current_user,
    title: str,
    message: str,
    channels: list[str],
    notification_type: str
):
    prefs = await get_user_preferences(
        db,
        user.id,
        notification_type
    )

    filtered_channels = await filter_channels(prefs, channels)

    if not filtered_channels:
        return  # user disabled everything
    
    notification = Notification(
        user_id=user.id,
        title=title,
        message=message,
        notification_type=notification_type,
        channels=filtered_channels,
    )

    db.add(notification)
    await db.commit()
    await db.refresh(notification)

    for channel in filtered_channels:
        recipient = get_recipient(user, channel)

        if not recipient:
            continue  

        payload = {
            "to": recipient,
            "title": title,
            "message": message,
        }

        # send per channel
        send_notification_task.delay(payload, channel)
    
    