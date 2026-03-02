from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

class Livestock(Base):
    __tablename__ = 'cows'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200))
    breed = Column(String(200))
    age = Column(Integer)
    health_status = Column(String(200))
    farmer_id = Column(UUID(as_uuid=True), ForeignKey('farmers.id', ondelete='CASCADE'))

