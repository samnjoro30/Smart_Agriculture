from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from .schema import (
    AdminLoginRequest,
    TokenResponse,
    AdminLivestockStatsResponse,
    FarmerListResponse,
    UpdateStatusSchema,
)
from .repository import (
    AdminRepository,
    AdminFarmerRepository,
    AdminFinanceRepository,
    AdminReportRepository,
)
from .service import (
    AdminService,
    AdminFarmerService,
    AdminFinanceService,
    AdminReportService,
)
from .depedency import get_current_admin
from modules.livestock.model import Livestock
from typing import List

from sqlalchemy import func
from modules.auth.models import Users  # Adjust paths based on your structure


router = APIRouter(prefix="/admin/auth", tags=["Admin Authentication"])


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: AdminLoginRequest, response: Response, db: AsyncSession = Depends(get_db)
):
    repo = AdminRepository(db)
    service = AdminService(repo)

    admin, token = await service.authenticate(payload)

    # Cookie Setup
    response.set_cookie(
        key="access_token", value=token, httponly=True, secure=True, samesite="lax"
    )

    return {"access_token": token, "token_type": "bearer", "user": admin}


# from modules.Livestock.models import Livestock
@router.get("/overview-stats")
async def get_overview_stats(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),  # Your auth dependency
):
    repo = AdminRepository(db)
    service = AdminService(repo)

    stats = await service.get_dashboard_overview(admin)
    return stats


@router.get("/me")
async def get_me(admin=Depends(get_current_admin)):
    return {"full_name": admin.full_name, "email": admin.email, "role": "Admin"}


@router.get("/livestock-stats", response_model=AdminLivestockStatsResponse)
async def get_admin_livestock_stats(
    db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)
):
    repo = AdminRepository(db)
    service = AdminService(repo)

    return await service.get_livestock_overview()


@router.get("/farmers", response_model=List[FarmerListResponse])
async def get_farmers(
    db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)
):
    repo = AdminFarmerRepository(db)
    service = AdminFarmerService(repo)
    return await service.list_farmers()


@router.patch("/farmers/{farmer_id}/status")
async def change_farmer_status(
    farmer_id: str,
    status_update: UpdateStatusSchema,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = AdminFarmerRepository(db)
    service = AdminFarmerService(repo)
    return await service.update_farmer_status(farmer_id, status_update.is_active)


@router.get("/finance-stats")
async def get_finance_stats(
    db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)
):
    repo = AdminFinanceRepository(db)
    service = AdminFinanceService(repo)
    return await service.get_finance_overview()


@router.get("/reports/summary")
async def get_system_report(
    days: int = 30, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)
):
    repo = AdminReportRepository(db)
    service = AdminReportService(repo)
    return await service.generate_system_summary(days)
