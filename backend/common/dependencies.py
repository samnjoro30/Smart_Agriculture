from datetime import datetime, timezone
from fastapi import Depends, HTTPException, status
from modules.auth.models import Users
from config.security import get_current_user

from sqlalchemy.future import select
from sqlalchemy.sql import func
from sqlalchemy.ext.asyncio import AsyncSession


# 1. Map maximum animal capacity per tier
TIER_ANIMAL_LIMITS = {
    "BASIC": 3,
    "STARTER": 8,
    "STANDARD": 16,
    "PREMIUM": 32
}

# 2. Map feature access per tier (Higher tiers inherit lower tier features)
STANDARD_FEATURES = {
    "heat_prediction",
    "feed_stock_calculation",
    "mobile_alerts_sms",
    "breeding_records"
}

PREMIUM_FEATURES = STANDARD_FEATURES | {
    "disease_tracking",
    "ai_vet_insights",
    "full_ai_integration"
}

TIER_FEATURE_ACCESS = {
    "BASIC": set(),
    "STARTER": set(),
    "STANDARD": STANDARD_FEATURES,
    "PREMIUM": PREMIUM_FEATURES
}

async def require_package_subscription(current_user: Users = Depends(get_current_user)):
    # Block account if suspended globally
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your user account is inactive or suspended. Please contact support."
        )

    # If they are on a paid tier, enforce active flag and check date
    if current_user.package_tier in ["STARTER", "STANDARD", "PREMIUM"]:
        if not current_user.package_is_active:
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="Your subscription package is inactive. Please pay via M-Pesa to unlock features."
            )
            
        now = datetime.now(timezone.utc)
        if current_user.package_expiry is None or current_user.package_expiry < now:
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="Your subscription package has expired. Please renew via M-Pesa."
            )

    return current_user

async def verify_animal_capacity(
    current_user: Users = Depends(require_package_subscription),
    db: AsyncSession = Depends(get_db) 
):
    """
    Dependency that blocks animal creation requests if current capacities are exceeded.
    """
    tier = current_user.package_tier or "BASIC"
    max_allowed = TIER_ANIMAL_LIMITS.get(tier, 3)

    # Query current count of animals owned by this user
    # Adjust 'Animal' to match your actual model structure
    result = await db.execute(
        select(func.count()).where(Animal.user_id == current_user.id)
    )
    current_count = result.scalar() or 0

    if current_count >= max_allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Registration limit reached. Your current '{tier}' package allows a max of {max_allowed} animals."
        )
    return current_user
    

def require_feature(feature_name: str):
    """
    Factory dependency to gate features dynamically based on Tier requirements.
    """
    async def dependency(current_user: Users = Depends(require_package_subscription)):
        tier = current_user.package_tier or "BASIC"
        allowed_features = TIER_FEATURE_ACCESS.get(tier, set())
        
        if feature_name not in allowed_features:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"The requested feature [{feature_name.replace('_', ' ').title()}] requires a tier upgrade."
            )
        return current_user
    return dependency