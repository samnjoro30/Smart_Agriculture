from db.postgre_db import Base
from sqlalchemy import Column, Integer, String, Boolean

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    farmName = Column(String(50))
    email = Column(String(50), unique=True)
    phoneNumber = Column(String(50), unique=True)
    password = Column(String(50))
    confirmPassword = Column(String(50))