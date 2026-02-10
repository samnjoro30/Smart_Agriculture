import os

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .setting import settings

load_dotenv()

NEON_DB = os.getenv("NEON_DB")

engine = create_async_engine(
    settings.NEON_DB,
    echo=True,
    pool_size=5,  # adjust based on traffic
    max_overflow=10,  # temporary connections
    pool_timeout=30,  # wait before raising error
    pool_recycle=1800,
)

# Create async sessionmaker
AsyncSessionLocal = sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

Base = declarative_base()


# function to run db
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
