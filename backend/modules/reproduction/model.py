
from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from config.database import Base
from sqlalchemy.dialects.postgresql import UUID

class MilkRecord(Base):
    __tablename__ = "milk_records"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    cow_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("livestock.id", ondelete='CASCADE'), 
        nullable=True
    )

    liters = Column(Float, nullable=False)
    price_per_liter = Column(Float, nullable=False)
    total_revenue = Column(Float, nullable=False)

    session = Column(String, nullable=False)  # 'single' | 'bulk'
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

