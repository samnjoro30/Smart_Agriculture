from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

# from enum import Enum
# import enum

# class UserRole(str, enum.Enum):
#     ADMIN = "admin"
#     FARMER = "farmer"


class Users(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(200), unique=True, index=True)
    email = Column(String(150), unique=True, index=True)
    farmname = Column(String(200))
    otp_expires_at = Column(DateTime, nullable=True)
    is_verified = Column(Boolean(), index=True, default=False)
    otp = Column(String(8))
    phonenumber = Column(String(200), unique=True, index=True)
    password = Column(String(200))
    createdAt = Column(DateTime, server_default=func.now())
    is_active = Column(Boolean(), default=True, index=True)

    package_is_active = Column(Boolean(), default=False, nullable=True)
    package_tier = Column(String(20), default="BASIC", nullable=False)
    package_expiry = Column(DateTime(timezone=True), nullable=True)
    refresh_tokens = relationship(
        "RefreshToken",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    transactions = relationship("PaymentTransaction", back_populates="user")
    # role = Column(String(20), default=UserRole.FARMER, nullable=False)

    reports = relationship("ReportRecord", backref="user")


class RefreshToken(Base):
    __tablename__ = "refresh_token"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    token = Column(String(500), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)
    user = relationship("Users", back_populates="refresh_tokens")


class OTPVerification(Base):
    __tablename__ = "otp_verification"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"))
    otp = Column(String(8))
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    user = relationship("Users")


class NewsSubscribers(Base):
    __tablename__ = "subscribers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(200), unique=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
