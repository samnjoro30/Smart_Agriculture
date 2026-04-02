from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from uuid import UUID
from .model import Feeds

# CREATE
async def create_feed(feed_data: dict, db: AsyncSession):
    new_feed = Feeds(**feed_data)
    db.add(new_feed)
    await db.flush()
    return new_feed


# GET ALL
async def get_all_feeds(db: AsyncSession, user_id: UUID):
    result = await db.execute(
        select(Feeds).where(Feeds.user_id == user_id)
    )
    return result.scalars().all()


# GET ONE
async def get_feed(db: AsyncSession, feed_id: UUID, user_id: UUID):
    result = await db.execute(
        select(Feeds).where(
            Feeds.id == feed_id,
            Feeds.user_id == user_id
        )
    )
    return result.scalar_one_or_none()


# UPDATE
async def update_feed(db: AsyncSession, feed_id: UUID, user_id: UUID, data: dict):
    result = await db.execute(
        select(Feeds).where(
            Feeds.id == feed_id,
            Feeds.user_id == user_id
        )
    )
    feed = result.scalar_one_or_none()

    if not feed:
        return None

    for key, value in data.items():
        setattr(feed, key, value)

    await db.flush()
    return feed


# DELETE
async def delete_feed(db: AsyncSession, feed_id: UUID, user_id: UUID):
    result = await db.execute(
        select(Feeds).where(
            Feeds.id == feed_id,
            Feeds.user_id == user_id
        )
    )
    feed = result.scalar_one_or_none()

    if not feed:
        return False

    await db.delete(feed)
    return True