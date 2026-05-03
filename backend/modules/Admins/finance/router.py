from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from .repository import AdminFinanceRepository
from .service import AdminFinanceService
from auth.dependency import get_current_admin


@router.get("/finance-stats")
async def get_finance_stats(
    db: AsyncSession = Depends(get_db), admin: Admin = Depends(get_current_admin)
):
    repo = AdminFinanceRepository(db)
    service = AdminFinanceService(repo)
    return await service.get_finance_overview()
