from db.postgre_db import Base
from sqlalchemy import Column, Integer, String, Boolean

class Users(Base):
    __tablename__ = "mkulimafinest"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(200), unique=True)
    email = Column(String(150), unique=True)
    farmname = Column(String(200))
    phonenumber = Column(String(200), unique=True)
    password = Column(String(200))

class RefreshToken(Base):

    __tablename__ = "refresh_token"

    id = Column(Integer, primary_key=True, index=True)
    username= Column(String(200), nullable=False)
    token = Column(String(500), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)

