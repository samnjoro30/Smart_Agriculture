import os
import threading
import time
import httpx
import asyncio

import requests
from fastapi import FastAPI, Request, Response, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from config.redis.client import init_redis, close_redis

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from config.audit.logger import setup_logging

from config.middleware import audit_middleware
from config.audit.middleware.request_id import request_id_middleware
from config.audit.middleware.performance import performance_middleware
#from config.audit.middleware.auth_context import auth_context_middleware
from config.audit.middleware.error import error_middleware
from config.audit.middleware.logging import logging_middleware
from config.audit.middleware.security import security_middleware
# from config.lifespan import Lifespan

from modules.auth.router import router as auth_farmer
from modules.farmers.router import router as farm_router
from modules.livestock.router import router as livestock_router
from modules.nutrition.router import router as nutrition_router
from modules.payments.router import router as payments_router
from modules.reproduction.router import router as reproduction_router
from modules.analytics.router import router as analytics_router
from modules.reports.router import router as reports_router

from modules.Admins.auth.router import router as auth_admin

from hooks.tasks import cleanup_dead_connections
from hooks.call import manager


setup_logging()

app = FastAPI(
    title="Smart farm API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "*"
        # "http://localhost:3000",
        # "https://smart-agriculture-git-main-samnjoro30s-projects.vercel.app",
        "https://smart-agriculture-pied.vercel.app",
        "https://smart-farming-agriculture.web.app",
        # "https://smart-farming-agriculture.firebaseapp.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1000)
# limiting number of request from ip
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.middleware("http")(performance_middleware)
#app.middleware("http")(audit_middleware)
app.middleware("http")(error_middleware)
app.middleware("http")(request_id_middleware)
#app.middleware("http")(auth_context_middleware)
app.middleware("http")(logging_middleware)
app.middleware("http")(security_middleware)


app.include_router(auth_farmer)
app.include_router(farm_router)
app.include_router(livestock_router)
app.include_router(nutrition_router)
app.include_router(payments_router)
app.include_router(reproduction_router)
app.include_router(analytics_router)
app.include_router(reports_router)

app.include_router(auth_admin)



@app.get("/ping")
async def ping():
    return {"status": "ok"}


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()

    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.on_event("startup")
async def startup():
    await init_redis()
    asyncio.create_task(manager.send_ping())
    asyncio.create_task(cleanup_dead_connections(manager))
    async def warm_db():
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))

    async def keep_alive():
        async with httpx.AsyncClient(timeout=5.0) as client:

            while True:
                try:
                    await client.get(
                        "https://smart-agriculture-21dt.onrender.com/ping", timeout=5
                    )
                    print("Self-ping successful")
                except Exception as e:
                    print("Self-ping failed:", e)
                
                await asyncio.sleep(600) 

    asyncio.create_task(keep_alive())

@app.on_event("shutdown")
async def shutdown():
    await close_redis()