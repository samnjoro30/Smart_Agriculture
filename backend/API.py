from fastapi import FastAPI 
from fastapi.middleware.cores import CORSMiddleware
from backend.db.database import Base, engine, get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        '*'
    ]
    allow_methods = [
        "*"
    ]
    allow_headers = [
        "*"
    ]
)

app.include_router()

@app.get("/login")
def login():
    user = 
    return user

