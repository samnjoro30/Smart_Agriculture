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
from datetime import datetime
from typing import Optional
from config.setting import get_settings
from config.security import get_current_user
from .repository import (
    get_monthly_analytics,
    get_daily_milk_trend,
    get_session_performance,
    get_top_performing_cows,
    get_monthly_summary_stats,
    get_financial_summary,
)


router = APIRouter(prefix="/analytics", tags=["Analytics"])

logger = get_logger("ANALYTICS")
settings = get_settings()


@router.get("/analytics/dashboard")
async def get_dashboard_data(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Fetch consolidated stats
    stats = await get_monthly_analytics(db, current_user.id, year, month)

    # Fetch Daily Trend for the Line Graph
    daily_trend = await get_daily_milk_trend(db, current_user.id, year, month)

    return {"month": month, "year": year, "stats": stats, "daily_trend": daily_trend}


@router.get("/dashboard-summary")
async def get_summary(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await get_monthly_summary_stats(db, current_user.id, year, month)


@router.get("/production-trends")
async def get_trends(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Data for the Line Graph (X=Day, Y=Liters)
    return await get_daily_milk_trend(db, current_user.id, year, month)


@router.get("/session-revenue")
async def get_sessions(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Data for Revenue Performance (Morning vs Evening)
    return await get_session_performance(db, current_user.id, year, month)


@router.get("/cow-ranking")
async def get_ranking(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Data for Top Performing Cows bar chart
    return await get_top_performing_cows(db, current_user.id, year, month)


@router.get("/feed-efficiency")
async def get_efficiency(
    month: int = datetime.now().month,
    year: int = datetime.now().year,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    summary = await get_monthly_summary_stats(db, current_user.id, year, month)
    revenue = summary["total_revenue"]
    feed_cost = summary["total_feed_cost"]

    return {
        "revenue": revenue,
        "feed_cost": feed_cost,
        "efficiency_ratio": revenue / feed_cost if feed_cost > 0 else 0,
    }


@router.get("/summary")
async def get_analytics_summary(
    month: Optional[int] = None,
    year: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Default to current month/year if not provided
    now = datetime.now()
    target_month = month or now.month
    target_year = year or now.year

    try:
        summary = await get_financial_summary(
            db, current_user.id, target_year, target_month
        )
        return summary
    except Exception as e:
        logger.error(f"Summary KPI Error: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to calculate financial summary"
        )


# @router.get("/daily-stats")
# async def get_analytics_summary(
#     db: AsyncSession = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
# @router.get("/feed-to-milk-efficiency")
# async def get_analytics_summary(
#     db: AsyncSession = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):

# @router.get("/cow-ranking")
# async def get_analytics_summary(
#     db: AsyncSession = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):

# @router.get("/milk-production-trends")
# async def get_analytics_summary(
#     db: AsyncSession = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
