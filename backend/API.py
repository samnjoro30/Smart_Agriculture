from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db.postgre_db import Base, engine, get_db
from controller.auth import router as auth_router
from controller.users import app as user_router
from model.auth import RegisterRequest
from db.postgre_db import Base, engine
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from alembic import command
from alembic.config import Config
import os

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
        "https://smart-agriculture-pied.vercel.app"
        ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(user_router)



@app.on_event("startup")
async def startup():
    if os.getenv("RUN_MIGRATIONS") == "true":
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")

