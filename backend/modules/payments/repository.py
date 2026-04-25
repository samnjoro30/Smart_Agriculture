
from datetime import datetime, timedelta, timezone
from sqlalchemy.sql import func, case
from sqlalchemy import text, select, or_, delete
from sqlalchemy.ext.asyncio import AsyncSession
from .model import PaymentCheck, PaymentTransaction
from sqlalchemy.dialects.postgresql import UUID
from config.audit.logger import get_logger
import asyncio

logger = get_logger("PAYMENTS")

async def update_callback(db: AsyncSession, checkout_request_id: str, status: str, mpesa_receipt_number: str | None = None):
    result = await db.execute(
        select(PaymentCheck).where(PaymentCheck.checkout_request_id == checkout_request_id)
    )
    payment = result.scalar_one_or_none()
    
    if not payment:
        return None

    # IDEMPOTENCY CHECK: If already processed, don't update again
    if payment.status in ["success", "FAILED"]:
        return payment

    payment.status = status
    if mpesa_receipt_number:
        payment.mpesa_receipt_number = mpesa_receipt_number
    
    payment.updated_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(payment)
    return payment

async def update_callback_with_retry(db: AsyncSession, checkout_id: str, status: str, receipt: str, retries=3):
    for i in range(retries):
        payment = await update_callback(db, checkout_id, status, receipt)
        if payment:
            return payment
        # Wait 1.5 seconds before trying again to let the main thread commit
        await asyncio.sleep(1.5) 
    return None

async def get_payment_by_checkout_id_from_db(db: AsyncSession, checkout_id: str, user_id: UUID):
    result = await db.execute(
        select(PaymentCheck).where(
            PaymentCheck.checkout_request_id == checkout_id,
            PaymentCheck.user_id == user_id
        )
    )

    return result.scalar_one_or_none()

async def update_payment_and_ledger(
    db: AsyncSession, 
    checkout_id: str, 
    status: str, 
    res_code: int,
    res_desc: str,
    mpesa_receipt: str | None,
    raw_payload: dict
):
    """
    Atomic operation to update payment and create a transaction ledger entry.
    """
    # Retry logic built-in to handle fast callbacks
    payment = None
    for attempt in range(4):
        result = await db.execute(
            select(PaymentCheck).where(PaymentCheck.checkout_request_id == checkout_id)
        )
        payment = result.scalar_one_or_none()
        if payment:
            break
        await asyncio.sleep(1) # Wait 1s before retrying
    
    if not payment:
        return None

    # Idempotency: Don't re-process finished transactions
    if payment.status in ["SUCCESS", "FAILED"]:
        return payment

    try:
        # 1. Update Payment Record
        payment.status = status
        payment.result_code = int(res_code) if res_code is not None else None
        payment.result_desc = res_desc
        payment.mpesa_receipt_number = mpesa_receipt
        payment.raw_callback_payload = raw_payload
        payment.completed_at = datetime.now(timezone.utc)

        # 2. Create Ledger Entry in 'transactions' table
        if status == "SUCCESS":
            ledger_entry = PaymentTransaction(
                user_id=payment.user_id,
                payment_id=payment.id,
                amount=payment.amount,
                transaction_type="CREDIT",
                category="FARM_UPGRADE", 
                reference=f"TXN-{mpesa_receipt or uuid.uuid4().hex[:8]}",
                description=f"M-Pesa Payment Received: {mpesa_receipt}"
            )
            db.add(ledger_entry)
            
            # TODO: Add logic here to actually update the User's plan in the 'users' table
            # e.g., user = await db.get(User, payment.user_id); user.plan = "Premium"

        await db.commit()
        await db.refresh(payment)
        return payment

    except Exception as e:
        await db.rollback()
        logger.error(f"DB Update Failed: {str(e)}")
        raise e