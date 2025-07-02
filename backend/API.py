from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from db.postgre_db import Base, engine, get_db
from controller.auth import auth
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    
    # allow_methods = ["*"]
    # allow_headers = [ "*"]
)

app.include_router(router)


