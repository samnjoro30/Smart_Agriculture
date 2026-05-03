from uuid import UUID
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, select
from .model import ReportRecord
from modules.payments.model import (
    PaymentTransaction,
    PaymentCheck,
)  # Import from your other modules


class ReportRepository:

    @staticmethod
    async def create_report_record(
        db: AsyncSession, user_id: UUID, report_type: str, parameters: dict
    ):
        """Creates the initial pending report entry."""
        db_report = ReportRecord(
            user_id=user_id,
            report_type=report_type,
            parameters=parameters,
            status="PENDING",
        )
        db.add(db_report)
        await db.commit()  # MUST AWAIT
        await db.refresh(db_report)  # MUST AWAIT
        return db_report

    @staticmethod
    async def get_transactions_by_period(
        db: AsyncSession, user_id: UUID, start_date: datetime, end_date: datetime
    ):
        """Queries the Ledger for the financial report using Async syntax."""
        # Use select() instead of db.query()
        stmt = (
            select(PaymentTransaction)
            .where(
                and_(
                    PaymentTransaction.user_id == user_id,
                    PaymentTransaction.created_at >= start_date,
                    PaymentTransaction.created_at <= end_date,
                )
            )
            .order_by(PaymentTransaction.created_at.desc())
        )

        result = await db.execute(stmt)  # MUST AWAIT execute
        return result.scalars().all()

    @staticmethod
    async def get_report_by_id(db: AsyncSession, report_id: UUID, user_id: UUID):
        """Fetches a specific report record."""
        stmt = select(ReportRecord).where(
            ReportRecord.id == report_id, ReportRecord.user_id == user_id
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_payment_check_details(db: AsyncSession, payment_id: UUID):
        """Queries the M-Pesa Callback table."""
        stmt = select(PaymentCheck).where(PaymentCheck.id == payment_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def update_report_status(
        db: AsyncSession, report_id: UUID, status: str, file_url: str = None
    ):
        """Updates status with proper async handling."""
        stmt = select(ReportRecord).where(ReportRecord.id == report_id)
        result = await db.execute(stmt)
        db_report = result.scalar_one_or_none()

        if db_report:
            db_report.status = status
            if file_url:
                db_report.file_url = file_url
            await db.commit()  # MUST AWAIT
            await db.refresh(db_report)  # MUST AWAIT
        return db_report
