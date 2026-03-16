from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from config.logger import get_logger
from config.database import get_db

from .service import farmUser
from config.security import get_current_user

router = APIRouter(prefix="/farm", tags=["Farmers"])

logger = get_logger(__name__)


@router.get("/farm-profile")
async def get_farm_profile(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
    ):
    farmer = await farmUser(db, current_user) 
    return farmer

@router.get("/farm/stats")
async def get_farm_stats():
    return {"message": "This is the farm stats endpoint"}   
@router.get("/farm/recent-activity")
async def get_recent_activity():
    return {"message": "working on the endpoint endpoint"}


# @router.put("/update-email")
# async def update_farmer_email():
#     return {"message": "This is the update farmer email endpoint"}


# @router.put("/update-password")
# async def update_farmer_password():
#     return {"message": "This is the update farmer password endpoint"}


# @router.put("/update-phonenumber")
# async def update_farmer_phonenumber():
#     return {"message": "This is the update farmer phone number endpoint"}
