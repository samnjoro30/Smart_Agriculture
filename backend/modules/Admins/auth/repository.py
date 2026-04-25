from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import select, func, update, and_
from datetime import datetime, timedelta
from .model import Admin
from modules.auth.models import Users
from modules.livestock.model import Livestock
from modules.payments.model import PaymentCheck, PaymentTransaction

class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_email(self, email: str):
        query = select(Admin).where(Admin.email == email)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def create_admin(self, admin_obj: Admin):
        self.db.add(admin_obj)
        await self.db.commit()
        await self.db.refresh(admin_obj)
        return admin_obj

    async def get_overview_metrics(self):
        # 1. Total Farmers Count
        farmer_stmt = select(func.count(Users.id))
        farmer_result = await self.db.execute(farmer_stmt)
        total_farmers = farmer_result.scalar() or 0

        # 2. Recent Registrations (Last 5 farmers)
        recent_farmers_stmt = select(Users).order_by(Users.createdAt.desc()).limit(5)
        recent_result = await self.db.execute(recent_farmers_stmt)
        recent_farmers = recent_result.scalars().all()

        return {
            "total_farmers": total_farmers,
            "recent_farmers": recent_farmers,
            # For now, we'll return placeholders for livestock/revenue
            "livestock_monitored": 0, 
            "active_alerts": 12,
            "revenue": 450000
        }
    
    async def get_all_livestock_metrics(self):
        # 1. Total count (Active only)
        total_stmt = select(func.count(Livestock.id)).where(Livestock.status == "ACTIVE")
        
        # 2. Category distribution (Cows, Goats, etc.)
        category_stmt = select(Livestock.category, func.count(Livestock.id))\
            .where(Livestock.status == "ACTIVE")\
            .group_by(Livestock.category)
            
        # 3. Reproductive Status (Pregnancy & Heat)
        repro_stmt = select(
            func.count(Livestock.id).filter(Livestock.pregnant == True).label("total_pregnant"),
            func.count(Livestock.id).filter(Livestock.heatStatus == True).label("total_in_heat")
        ).where(Livestock.status == "ACTIVE")

        # 4. Health Status distribution
        health_stmt = select(Livestock.healthStatus, func.count(Livestock.id))\
            .where(Livestock.status == "ACTIVE")\
            .group_by(Livestock.healthStatus)

        # Execute all
        total = await self.db.execute(total_stmt)
        categories = await self.db.execute(category_stmt)
        repro = await self.db.execute(repro_stmt)
        health = await self.db.execute(health_stmt)

        repro_data = repro.mappings().first()

        return {
            "total_count": total.scalar() or 0,
            "categories": {row[0]: row[1] for row in categories.all()},
            "health_summary": {row[0]: row[1] for row in health.all()},
            "reproductive": {
                "pregnant": repro_data["total_pregnant"],
                "in_heat": repro_data["total_in_heat"]
            }
        }

class AdminFarmerRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all_farmers(self):
        # Fetch farmers with their registration date and verification status
        stmt = select(Users).order_by(Users.createdAt.desc())
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def toggle_user_status(self, user_id: str, status: bool):
        # Update is_active status
        stmt = (
            update(Users)
            .where(Users.id == user_id)
            .values(is_active=status)
            .returning(Users.is_active)
        )
        result = await self.session.execute(stmt)
        return result.scalar()
    
class AdminFinanceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_financial_metrics(self):
        # 1. Total Successful Revenue (from Transactions)
        revenue_stmt = select(func.sum(PaymentTransaction.amount))
        
        # 2. M-Pesa Success Rate (from PaymentCheck)
        success_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "SUCCESS")
        failed_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "FAILED")
        pending_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "PENDING")

        # 3. Recent Transactions with User info
        # We join with Users to show who paid
        recent_stmt = (
            select(PaymentTransaction, Users.username)
            .join(Users, PaymentTransaction.user_id == Users.id)
            .order_by(PaymentTransaction.created_at.desc())
            .limit(10)
        )

        # Execute
        rev_res = await self.session.execute(revenue_stmt)
        succ_res = await self.session.execute(success_stmt)
        fail_res = await self.session.execute(failed_stmt)
        pend_res = await self.session.execute(pending_stmt)
        recent_res = await self.session.execute(recent_stmt)

        return {
            "total_revenue": rev_res.scalar() or 0,
            "stats": {
                "success": succ_res.scalar() or 0,
                "failed": fail_res.scalar() or 0,
                "pending": pend_res.scalar() or 0,
            },
            "recent": recent_res.all()
        }

class AdminReportRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_report_data(self, days: int = 30):
        since_date = datetime.now() - timedelta(days=days)

        # 1. New Farmer Growth
        new_farmers = await self.session.execute(
            select(func.count(Users.id)).where(Users.createdAt >= since_date)
        )

        # 2. Livestock Reproduction Summary
        repro_stats = await self.session.execute(
            select(
                func.count(Livestock.id).filter(Livestock.pregnant == True).label("pregnant"),
                func.count(Livestock.id).filter(Livestock.heatStatus == True).label("in_heat")
            ).where(Livestock.status == "ACTIVE")
        )

        # 3. Financial Performance
        revenue = await self.session.execute(
            select(func.sum(PaymentTransaction.amount))
            .where(PaymentTransaction.created_at >= since_date)
        )

        # 4. Category Breakdown for Revenue
        category_rev = await self.session.execute(
            select(PaymentTransaction.category, func.sum(PaymentTransaction.amount))
            .where(PaymentTransaction.created_at >= since_date)
            .group_by(PaymentTransaction.category)
        )

        return {
            "timeframe_days": days,
            "new_farmers": new_farmers.scalar() or 0,
            "repro": repro_stats.mappings().first(),
            "period_revenue": float(revenue.scalar() or 0),
            "revenue_by_category": {row[0]: float(row[1]) for row in category_rev.all()}
        }