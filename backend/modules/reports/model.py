from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from config.database import Base


class ReportRecord(Base):
    __tablename__ = "report_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    # Type of report: 'MILK_PRODUCTION', 'FINANCIAL_SUMMARY', 'HERD_HEALTH'
    report_type = Column(String(50), nullable=False)

    # The parameters used to generate the report (start_date, end_date, animal_id etc)
    parameters = Column(JSON, nullable=True)

    # File handling
    file_url = Column(String(500), nullable=True)  # Path to S3 or local storage
    status = Column(String(20), default="PENDING")  # PENDING, GENERATED, PAID, FAILED

    # Link to the payment used to unlock this report
    payment_id = Column(UUID(as_uuid=True), ForeignKey("payment.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)


class ReportConfig(Base):
    """Stores pricing and availability for different report types"""

    __tablename__ = "report_settings"

    id = Column(UUID(as_uuid=True), primary_key=True)
    report_name = Column(String(100), unique=True)
    base_price = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
