
from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey, Numeric, Index 
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from datetime import datetime
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

class PaymentCheck(Base):
    __tablename__ = 'payment'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    amount = Column(Numeric(10, 2))
    phone_number = Column(String)
    currency = Column(String, default="KES", nullable=False)

    provider = Column(String(20), default="MPESA")
    checkout_request_id = Column(String, unique=True, index=True)
    merchant_request_id = Column(String)
    mpesa_receipt_number = Column(String(50), unique=True, nullable=True, index=True)
    
    status = Column(String, default="PENDING", index=True) # PENDING, SUCCESS, FAILED
    result_code = Column(Integer, nullable=True)
    result_desc = Column(String(255), nullable=True)

    raw_callback_payload = Column(JSONB, nullable=True)
    account_reference = Column(String(100), nullable=True)
    transaction_desc = Column(String(255), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    initiated_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    report = relationship("ReportRecord", backref="payment_origin", uselist=False)
     
    __table_args__ = (
        Index("idx_user_status", "user_id", "status"),
        Index("idx_checkout_status", "checkout_request_id", "status"),
    )


class PaymentTransaction(Base):
    __tablename__ = 'transactions'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'), 
        nullable=False
    )

    payment_id = Column(UUID(as_uuid=True), ForeignKey('payment.id'), nullable=True)
    
    amount = Column(Numeric(10, 2), nullable=False)
    transaction_type = Column(String(20), nullable=False)
    
    category = Column(String(50), nullable=False) 
    
    # Internal Tracking
    reference = Column(String(100), unique=True, index=True) # Your own internal ID
    description = Column(String(255))

    # This is useful for grouping financial history
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("Users", back_populates="transactions")
    payment = relationship("PaymentCheck")