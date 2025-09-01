from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os

from dotenv import load_dotenv
import asyncio

load_dotenv()

NEON_DB = os.getenv("NEON_DB")

engine = create_async_engine(
    NEON_DB, 
    echo=True, 
    pool_size=5,          # adjust based on traffic
    max_overflow=10,      # temporary connections
    pool_timeout=30,      # wait before raising error
    pool_recycle=1800 
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
    async  with AsyncSessionLocal() as session:
        yield session

       
