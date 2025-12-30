# main.py or a separate create_tables.py script
import asyncio

from db.postgre_db import engine
from model.tables import Base  # where your Users class is


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Tables created (development only)")


if __name__ == "__main__":
    asyncio.run(create_tables())
