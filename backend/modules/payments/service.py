

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_201_CREATED
from config.setting import get_settings
from config.audit.logger import get_logger
import httpx
import base64
import pytz


from .repository import (
    update_callback,
    update_callback_with_retry,
    get_payment_by_checkout_id_from_db,
)
from .model import PaymentCheck

settings = get_settings()
logger = get_logger("PAYMENTS")

def format_phone(phone: str) -> str:
    phone = phone.strip()

    if phone.startswith("0"):
        return "254" + phone[1:]
    if phone.startswith("+254"):
        return phone[1:]
    return phone

def extract_metadata(items, key):
    for item in items:
        if item.get("Name") == key:
            return item.get("Value")
    return None

def get_mpesa_timestamp():
    return datetime.now(pytz.timezone('Africa/Nairobi')).strftime("%Y%m%d%H%M%S")

#key improvement to add later: implement token caching to avoid redundant API calls for each payment initiation
async def get_mpesa_access_token():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            settings.MPESA_AUTH_URL,
            auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET)
        )
    return response.json().get("access_token")


async def initiate_stk_push(db: AsyncSession, payload, current_user):

    phone = format_phone(payload.phone_number)

    timestamp = get_mpesa_timestamp()

    password_str = f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}"
    password = base64.b64encode(password_str.encode()).decode()

    access_token = await get_mpesa_access_token()

    stk_payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(payload.amount),
        "PartyA": phone,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": f"user-{current_user.id}",
        "TransactionDesc": "Payment"
    }

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(
            settings.MPESA_STK_URL,
            json=stk_payload,
            headers=headers
        )

    data = response.json()

    if data.get("ResponseCode") != "0":
        raise Exception(f"STK Push failed: {data}")

    #  Save to DB
    payment = PaymentCheck(
        user_id=current_user.id,
        amount=payload.amount,
        phone_number=phone,
        status="PENDING",
        checkout_request_id=data.get("CheckoutRequestID"),
        merchant_request_id=data.get("MerchantRequestID")
    )

    db.add(payment)
    await db.commit()
    await db.refresh(payment)

    return payment


async def handle_stk_push_callback(db: AsyncSession, callback_data):
    logger.info("MPESA CALLBACK RAW", payload=callback_data)
    data = callback_data.get("Body", {}).get("stkCallback", {})
    res_code = data.get("ResultCode")
    checkout_id = data.get("CheckoutRequestID")
    

    metadata_items = data.get("CallbackMetadata", {}).get("Item", [])
    #mpesa_receipt = extract_metadata(metadata_items, "MpesaReceiptNumber")
    amount = extract_metadata(metadata_items, "Amount")
    phone = extract_metadata(metadata_items, "PhoneNumber")

    if res_code == 0:
        mpesa_receipt = extract_metadata(metadata_items, "MpesaReceiptNumber")
        status = "success"
    else:
        mpesa_receipt = None
        status = "FAILED"

    # Process the update
    payment = await update_callback_with_retry(
        db, 
        checkout_id, 
        status=status, 
        mpesa_receipt_number=mpesa_receipt
    )

    if not payment:
        logger.warning(f"CheckoutID {checkout_id} not found in DB yet.")
        return {"ResultCode": 1, "ResultDesc": "Internal Error - Record Not Found"}

    return {
        "ResultCode": 0, 
        "ResultDesc": "Success",
        "checkout_request_id": checkout_id
    }


async def get_payment_by_checkout_id(db, checkout_id, current_user):
    payment = await get_payment_by_checkout_id_from_db(db, checkout_id, current_user.id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    return {
        "checkout_request_id": payment.checkout_request_id,
        "status": payment.status,
        "amount": float(payment.amount),
        "phone_number": payment.phone_number,
        "mpesa_receipt_number": payment.mpesa_receipt_number,
        "result_code": payment.result_code,
        "result_desc": payment.result_desc,
        "created_at": payment.created_at,
        "completed_at": payment.completed_at
    }

async def get_payment_status(db: AsyncSession, checkout_request_id):
    pass