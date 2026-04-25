from fastapi import HTTPException, status
from .repository import AdminRepository, AdminFarmerRepository, AdminFinanceRepository, AdminReportRepository
from config.security import create_access_token, create_refresh_token
from config.audit.logger import get_logger
from datetime import datetime
from .schema import AdminLoginRequest

from utils.hashing import hash_password, verify_password
from utils.otp import generate_otp, otp_expiry
from config.setting import get_settings



class AdminService:
    def __init__(self, repository: AdminRepository):
        self.repository = repository

    async def authenticate(self, payload):
        admin = await self.repository.get_by_email(payload.email)
        
        if not admin or not verify_password(payload.password, admin.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin credentials"
            )
        
        token = create_access_token(data={"sub": admin.email, "role": "admin"})
        return admin, token
    
    async def get_dashboard_overview(self, current_admin):
        metrics = await self.repository.get_overview_metrics()
        
        return {
            "admin_name": current_admin.full_name,
            "total_farmers": metrics["total_farmers"],
            "livestock_monitored": metrics["livestock_monitored"],
            "active_alerts": metrics["active_alerts"],
            "revenue": metrics["revenue"],
            "recent_activities": [
                {
                    "id": str(f.id),
                    "name": f.username,
                    "email": f.email,
                    "time": f.createdAt.isoformat()
                } for f in metrics["recent_farmers"]
            ]
        }
    
    async def get_livestock_overview(self):
        data = await self.repository.get_all_livestock_metrics()
        
        # Transform categories for a Chart-friendly format
        species_breakdown = [
            {"species": cat, "count": count} 
            for cat, count in data["categories"].items()
        ]

        return {
            "total_animals": data["total_count"],
            "reproductive_stats": data["reproductive"],
            "health_distribution": data["health_summary"],
            "species_breakdown": species_breakdown,
            "system_health_score": 94.5 # Placeholder logic
        }

class AdminFarmerService:
    def __init__(self, repository: AdminFarmerRepository):
        self.repo = repository

    async def list_farmers(self):
        farmers = await self.repo.get_all_farmers()
        return [
            {
                "id": str(f.id),
                "username": f.username,
                "email": f.email,
                "farmname": f.farmname,
                "is_verified": f.is_verified,
                "is_active": getattr(f, "is_active", True), # Fallback if col missing
                "joined_at": f.createdAt.isoformat()
            } for f in farmers
        ]

    async def update_farmer_status(self, user_id: str, active: bool):
        new_status = await self.repo.toggle_user_status(user_id, active)
        # Logic: If disabling, you could trigger a "Revoke all refresh tokens" here
        return {"id": user_id, "is_active": new_status}

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


class AdminReportService:
    def __init__(self, repository: AdminReportRepository):
        self.repo = repository

    async def generate_system_summary(self, days: int = 30):
        data = await self.repo.get_report_data(days)
        
        # Calculate a performance index (Example logic)
        # Higher growth and higher revenue = higher score
        performance_score = min(100, (data["new_farmers"] * 5) + (data["period_revenue"] / 10000))

        return {
            "generated_at": datetime.now().isoformat(),
            "period": f"Last {days} Days",
            "metrics": {
                "user_growth": data["new_farmers"],
                "revenue": data["period_revenue"],
                "revenue_split": data["revenue_by_category"],
                "livestock_health": data["repro"]
            },
            "performance_index": round(performance_score, 2),
            "recommendations": self._generate_recommendations(data)
        }

    def _generate_recommendations(self, data):
        recs = []
        if data["repro"]["pregnant"] < 5:
            recs.append("Low pregnancy rates detected. Advise farmers on artificial insemination services.")
        if data["new_farmers"] < 10:
            recs.append("User acquisition is slow. Consider a marketing campaign.")
        return recs