from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from config.audit.logger import get_logger
from config.setting import get_settings
from config.security import get_current_user
import httpx
 
from .service import (
    initiate_stk_push,
    handle_stk_push_callback,
    get_payment_by_checkout_id,
)

from .schema import (
    STKPushRequest,
)

router = APIRouter(prefix="/payments", tags=["Payments"])

logger = get_logger("PAYMENTS")

settings = get_settings()

@router.post("/mpesa/stk-push")
async def stk_push(
    payload: STKPushRequest,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        response = await initiate_stk_push(db, payload, current_user)

        logger.info("STK Push initiated successfully", status_code=201)
        return {
            "message": "STK Push initiated successfully", 
            "status": "success",
            "CheckoutRequestID": response.checkout_request_id
        }

    except httpx.HTTPError as e:
        logger.error("Safaricom API Unreachable", error=str(e))
        raise HTTPException(status_code=503, detail="Payment gateway temporarily unavailable")
    except Exception as e:
        logger.error("STK Push failed", error=str(e))
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/mpesa/status/{checkout_request_id}')
async def check_payment_status(
    checkout_request_id: str,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        response = await get_payment_by_checkout_id(
            db,
            checkout_request_id,
            current_user
        )

        return {
            "message": "Payment status fetched",
            "data": response
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        logger.error("Failed to fetch payment status", error=str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/mpesa/callback")
async def stk_push_callback(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    callback_data = await request.json()
    callback_response = await handle_stk_push_callback(db, callback_data)
    logger.info("STK Push callback processed", status_code=200, checkout_request_id=callback_response.get("checkout_request_id"))
    return callback_response    

@router.get("/my-payments")
async def get_my_payments(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
   
    pass