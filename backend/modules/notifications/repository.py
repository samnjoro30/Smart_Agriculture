from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .model import NotificationPreference


async def get_user_preferences(
    db: AsyncSession,
    user_id,
    notification_type: str
):
    result = await db.execute(
        select(NotificationPreference)
        .where(
            NotificationPreference.user_id == user_id,
            NotificationPreference.notification_type == notification_type
        )
    )

    return result.scalar_one_or_none()