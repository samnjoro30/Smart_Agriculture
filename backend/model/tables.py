from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from db.postgre_db import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(200), unique=True)
    email = Column(String(150), unique=True)
    farmname = Column(String(200))
    otp_expires_at = Column(DateTime, nullable=True)
    is_verified = Column(Boolean(), default=False)
    otp = Column(String(8))
    phonenumber = Column(String(200), unique=True)
    password = Column(String(200))
    createdAt = Column(DateTime, server_default=func.now())


class RefreshToken(Base):
    __tablename__ = "refresh_token"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    username = Column(String(200), nullable=False)
    token = Column(String(500), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)


class NewsSubscribers(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True)
