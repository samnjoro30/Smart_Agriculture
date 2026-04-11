from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship
from config.database import Base

class Report(Base):
    __tablename__ = 'animalreports'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200))
    description = Column(String(500))
    reportType = Column(String(100))
    livestockTag = Column(String(150), nullable=True)
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )
    createdAt = Column(DateTime, server_default=func.now())