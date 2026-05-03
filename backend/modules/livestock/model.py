from sqlalchemy import Boolean, Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from datetime import datetime
import uuid
from sqlalchemy.orm import relationship
from config.database import Base


class Livestock(Base):
    __tablename__ = "livestock"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tag = Column(String(150), unique=True, nullable=True)
    name = Column(String(200))
    category = Column(String(100))
    breed = Column(String(200))
    heatStatus = Column(Boolean, default=False)
    pregnant = Column(Boolean, default=False)
    lastInsemination = Column(DateTime(timezone=True))
    # nextHeatDate = Column(DateTime(timezone=True), nullable=True)
    age = Column(Integer, nullable=True)
    healthStatus = Column(String(200))
    inseminationType = Column(String(100))
    birthDate = Column(DateTime(timezone=True))
    motherTag = Column(String(150))
    fatherTag = Column(String(150))

    status = Column(
        String, default="ACTIVE", server_default="ACTIVE", nullable=False, index=True
    )
    archive_reason = Column(String, nullable=True)  # sold, died, removed
    archive_notes = Column(String, nullable=True)
    archived_at = Column(DateTime, nullable=True, index=True)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    createdAt = Column(DateTime, server_default=func.now())
