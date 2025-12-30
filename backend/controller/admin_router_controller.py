from fastapi import APIRouter, Request

from middleware.admin_auth import require_admin_role

router = APIRouter()


@router.get("/admin/hr-dashboard")
async def hr_dashboard(request: Request):
    await require_admin_role(request, "hr")
    return {"message": "Welcome HR Admin!"}


@router.get("/admin/super-dashboard")
async def super_dashboard(request: Request):
    await require_admin_role(request, "superadmin")
    return {"message": "Welcome Super Admin!"}
