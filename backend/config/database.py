import os
import time
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import event
from config.audit.context import query_count

from .setting import get_settings

load_dotenv()
settings = get_settings()
NEONB = settings.NEON_DB

engine = create_async_engine(
    NEONB,
    echo=True,
    pool_size=5,  
    max_overflow=10,  
    pool_timeout=30, 
    pool_recycle=1800,
    pool_pre_ping=True,
)

@event.listens_for(engine.sync_engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    context._query_start_time = time.perf_counter()
    count = query_count.get()
    query_count.set(count + 1)

@event.listens_for(engine.sync_engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    total = time.perf_counter() - context._query_start_time
    if total > 0.5:
        print(f"[SLOW QUERY] {total:.3f}s: {statement}")
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
