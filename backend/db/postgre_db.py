from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

USER = os.getenv('USER')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DBNAME =  os.getenv('DBNAME')


DATABASE_URL = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}" #?sslmode=require
#print("database url", DATABASE_URL)
#DATABASE_URL=os.getenv('DB_URL_POSTGRE')

engine = create_async_engine(DATABASE_URL, echo=True)

# ✅ Create async sessionmaker
AsyncSessionLocal = sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

Base = declarative_base()

# ✅ Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


       
