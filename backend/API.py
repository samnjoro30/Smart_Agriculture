from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db.postgre_db import Base, engine, get_db
from controller.auth import router as auth_router
from controller.users import app as user_router
from controller.farm import router as farm_router
from controller.farmAnalytic import router as farm_analytic_router
from model.auth import RegisterRequest
from db.postgre_db import Base, engine
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from alembic import command
from alembic.config import Config
import threading, requests
import os
import time

app = FastAPI()

# limiting number of request from ip
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://smart-agriculture-git-main-samnjoro30s-projects.vercel.app",
        "https://smart-agriculture-pied.vercel.app",
        "https://smart-farming-agriculture.web.app",
        "https://smart-farming-agriculture.firebaseapp.com"
        ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(farm_router)
app.include_router(farm_analytic_router)

@app.get("/ping")
async def ping():
    return {"status": "ok"}

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.on_event("startup")
async def startup():
    if os.getenv("RUN_MIGRATIONS") == "true":
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")

    def keep_alive():
        while True:
            try:
                requests.get("https://smart-agriculture-21dt.onrender.com/ping", timeout=5)
                print("Self-ping successful")
            except Exception as e:
                print("Self-ping failed:", e)
            time.sleep(600)  # every 10 minutes

    threading.Thread(target=keep_alive, daemon=True).start()
