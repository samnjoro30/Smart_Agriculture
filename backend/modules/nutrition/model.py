from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

class Feeds(Base):
    __tablename__ = 'feeds'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    category = Column(String(100))
    quantity = Column(Integer)
    unit = Column(String(50))
    costPerUnit = Column(Float)
    supplier = Column(String(100))
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    createdAt = Column(DateTime, server_default=func.now())
 
    usages = relationship("FeedUsage", backref="feed", cascade="all, delete")
    purchases = relationship("FeedPurchase", backref="feed", cascade="all, delete")

class FeedUsage(Base):
    __tablename__ = "feed_usage"

    id = Column(UUID(as_uuid=True), primary_key=True)
    feed_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("feeds.id"),
        nullable=False,
        )
    livestock_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("livestock.id", ondelete='SET NULL'), 
        nullable=True
    )
    quantity_used = Column(Float,  nullable=False)
    used_at = Column(DateTime, default=func.now())

class FeedPurchase(Base):
    __tablename__ = "feed_purchases"

    id = Column(UUID, primary_key=True)
    feed_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("feeds.id"), 
        nullable=False
    )    
    quantity = Column(Float)
    total_cost = Column(Float)
    purchased_at = Column(DateTime, server_default=func.now())