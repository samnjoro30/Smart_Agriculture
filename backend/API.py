from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from db.postgre_db import Base, engine, get_db
from controller.auth import router as auth_router
from model.auth import RegisterRequest
from db.postgre_db import Base, engine
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
#Base.metadata.create_all(bind=engine)

# @app.get("/")
# def read_root():
#     return {"message" : "API is running"}


