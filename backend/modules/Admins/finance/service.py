
from fastapi import HTTPException, status
from .repository import AdminRepository, AdminFarmerRepository
from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger
from .schema import AdminLoginRequest

from utils.hashing import hash_password, verify_password
from utils.otp import generate_otp, otp_expiry
from config.setting import get_settings


from .repository import AdminFinanceRepository


class AdminFinanceService:
    def __init__(self, repository: AdminFinanceRepository):
        self.repo = repository

    async def get_finance_overview(self):
        data = await self.repo.get_financial_metrics()
        
        return {
            "total_revenue": float(data["total_revenue"]),
            "currency": "KES",
            "transaction_stats": data["stats"],
            "recent_transactions": [
                {
                    "id": str(row[0].id),
                    "username": row[1],
                    "amount": float(row[0].amount),
                    "category": row[0].category,
                    "reference": row[0].reference,
                    "date": row[0].created_at.isoformat()
                } for row in data["recent"]
            ]
        }