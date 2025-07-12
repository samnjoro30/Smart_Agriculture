from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
import asyncio
import urllib.parse

load_dotenv()

USER = os.getenv('user')
PASSWORD = os.getenv('password')
HOST = os.getenv('host')
PORT = os.getenv('port')
DBNAME =  os.getenv('dbname')

encoded_password = urllib.parse.quote(PASSWORD)

DATABASE_URL = f"postgresql+psycopg2://{USER}:{encoded_password}@{HOST}:{PORT}/{DBNAME}" #?sslmode=require
print("database url", DATABASE_URL)
#DATABASE_URL=os.getenv('DB_URL_POSTGRE')

engine = create_engine(DATABASE_URL, echo=True)

# ✅ Create async sessionmaker
# AsyncSessionLocal = sessionmaker(
#     bind=engine,
#     expire_on_commit=False,
#     class_=AsyncSession,
# )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

# async def test_connection():
#     try:
#         async with engine.connect() as conn:
#             print("✅ Database connection successful")
#     except Exception as e:
#         print("❌ Failed to connect to the database:", e)


#asyncio.run(test_connection())

# ✅ Dependency to get DB session
# def get_db():
#     with AsyncSessionLocal() as session:
#         yield session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

       
