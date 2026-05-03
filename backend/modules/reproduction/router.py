from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    BackgroundTasks,
)
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from config.audit.logger import get_logger
from config.setting import get_settings
from config.security import get_current_user

from .schema import (
    MilkProductionRecordRequest,
    MilkProductionSummary,
    MilkRecordResponse,
)

from .service import (
    record_milk_production,
    fetch_milk_production_history,
)

router = APIRouter(prefix="/reproduction", tags=["Reproduction"])
logger = get_logger("REPRODUCTION")
settings = get_settings()


@router.post("/milk-production")
async def record_milk_production_endpoint(
    payload: MilkProductionRecordRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        record = await record_milk_production(db, payload, current_user)
        logger.info("POST /reproduction/milk-production completed", status_code=201)
        return {
            "message": "Milk production recorded successfully",
            "record_id": record.id,
        }
    except ValueError as ve:
        logger.warning(f"Validation error: {ve}", user_id=current_user.id)
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error: {e}", user_id=current_user.id)
        raise HTTPException(status_code=500, detail="An unexpected error occurred")


@router.get("/milk-summary", response_model=MilkProductionSummary)
async def get_milk_production_endpoint(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):
    try:
        # Service call to get data
        data = await fetch_milk_production_history(db, current_user)
        logger.info(
            f"Fetched {data['record_count']} milk records for user {current_user.id}"
        )
        return data
    except Exception as e:
        logger.error(f"Error fetching milk production: {e}")
        raise HTTPException(
            status_code=500, detail="Could not retrieve milk production records"
        )
