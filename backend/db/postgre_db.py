from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os

from dotenv import load_dotenv
import asyncio

load_dotenv()

DB = os.getenv("NEON_DB")

engine = create_async_engine(
    DB, 
    echo=True, 
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

       
