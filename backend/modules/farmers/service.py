
from fastapi import Request

from .repository import get_userProfile, check_user_by_email, UpdateEmail, UpdatePhoneNumber, UpdateFarmname, UpdatePassword


async def get_farmer_user(db, request: Request )