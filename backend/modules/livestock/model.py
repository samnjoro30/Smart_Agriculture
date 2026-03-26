from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

class Livestock(Base):
    __tablename__ = 'livestock'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tag = Column(String(150), unique=True, nullable=False)
    name = Column(String(200))
    category = Column(String(100))
    breed = Column(String(200))
    heatStatus = Column(Boolean, default=False)
    pregnant = Column(Boolean, default=False)
    lastInsemination = Column(DateTime)
    age = Column(Integer)
    healthStatus = Column(String(200))
    inseminationType = Column(String(100))
    birthDate = Column(DateTime)
    motherTag = Column(String(150))
    fatherTag = Column(String(150))
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    createdAt = Column(DateTime, server_default=func.now())

