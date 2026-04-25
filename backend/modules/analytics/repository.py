from sqlalchemy import func, extract, text, select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from uuid import UUID

# Import Models
from modules.reproduction.model import MilkRecord
from modules.nutrition.model import Feeds 
from modules.livestock.model import Livestock # Added this import

async def get_monthly_analytics(db: AsyncSession, user_id: UUID, year: int, month: int):
    # 1. Monthly Milk Stats
    milk_stmt = select(
        func.sum(MilkRecord.liters).label("total_liters"),
        func.sum(MilkRecord.total_revenue).label("total_revenue"),
        func.count(MilkRecord.id).label("record_count")
    ).where(
        MilkRecord.user_id == user_id,
        extract('year', MilkRecord.created_at) == year,
        extract('month', MilkRecord.created_at) == month
    )
    
    milk_result = await db.execute(milk_stmt)
    milk_data = milk_result.mappings().first()

    # 2. Monthly Feed Costs (Using createdAt as per your model)
    feed_stmt = select(
        func.sum(Feeds.quantity * Feeds.costPerUnit).label("total_feed_cost")
    ).where(
        Feeds.user_id == user_id,
        extract('year', Feeds.createdAt) == year,
        extract('month', Feeds.createdAt) == month
    )
    
    feed_result = await db.execute(feed_stmt)
    feed_cost = feed_result.scalar() or 0

    # 3. Top Performing Cows
    # Note: Using 'single' to match your model comment 'single' | 'bulk'
    cow_stmt = select(
        MilkRecord.cow_id,
        func.sum(MilkRecord.liters).label("yield")
    ).where(
        MilkRecord.user_id == user_id,
        MilkRecord.session == "single", 
        extract('month', MilkRecord.created_at) == month,
        extract('year', MilkRecord.created_at) == year
    ).group_by(MilkRecord.cow_id).order_by(text("yield DESC")).limit(5)

    cows_result = await db.execute(cow_stmt)
    top_cows = cows_result.mappings().all()

    return {
        "kpis": {
            "total_yield": milk_data["total_liters"] or 0,
            "total_revenue": milk_data["total_revenue"] or 0,
            "feed_cost": feed_cost,
            "net_profit": (milk_data["total_revenue"] or 0) - feed_cost
        },
        "top_cows": top_cows
    }

async def get_daily_milk_trend(db: AsyncSession, user_id: UUID, year: int, month: int):
    query = (
        select(
            func.date(MilkRecord.created_at).label("day"),
            func.sum(MilkRecord.liters).label("liters")
        )
        .where(
            MilkRecord.user_id == user_id,
            extract('year', MilkRecord.created_at) == year,
            extract('month', MilkRecord.created_at) == month
        )
        .group_by(func.date(MilkRecord.created_at))
        .order_by(text("day ASC"))
    )
    result = await db.execute(query)
    return result.mappings().all()

async def get_session_performance(db: AsyncSession, user_id: UUID, year: int, month: int):
    query = (
        select(
            MilkRecord.session,
            func.sum(MilkRecord.total_revenue).label("revenue")
        )
        .where(
            MilkRecord.user_id == user_id,
            extract('year', MilkRecord.created_at) == year,
            extract('month', MilkRecord.created_at) == month
        )
        .group_by(MilkRecord.session)
    )
    result = await db.execute(query)
    return result.mappings().all()

async def get_top_performing_cows(db: AsyncSession, user_id: UUID, year: int, month: int):
    query = (
        select(
            Livestock.tag.label("cow_tag"),
            Livestock.name.label("cow_name"),
            func.sum(MilkRecord.liters).label("total_liters")
        )
        .join(Livestock, MilkRecord.cow_id == Livestock.id)
        .where(
            # Explicitly reference MilkRecord.user_id to avoid ambiguity
            MilkRecord.user_id == user_id,
            extract('year', MilkRecord.created_at) == year,
            extract('month', MilkRecord.created_at) == month
        )
        .group_by(Livestock.tag, Livestock.name)
        .order_by(text("total_liters DESC"))
        .limit(5)
    )
    result = await db.execute(query)
    return result.mappings().all()

async def get_monthly_summary_stats(db: AsyncSession, user_id: UUID, year: int, month: int):
    milk_query = select(
        func.sum(MilkRecord.liters).label("total_yield"),
        func.sum(MilkRecord.total_revenue).label("total_revenue"),
        func.count(func.distinct(MilkRecord.cow_id)).label("active_cows")
    ).where(
        MilkRecord.user_id == user_id,
        extract('year', MilkRecord.created_at) == year,
        extract('month', MilkRecord.created_at) == month
    )
    
    feed_query = select(
        func.sum(Feeds.quantity * Feeds.costPerUnit).label("total_feed_cost")
    ).where(
        Feeds.user_id == user_id,
        extract('year', Feeds.createdAt) == year,
        extract('month', Feeds.createdAt) == month
    )

    milk_res = (await db.execute(milk_query)).mappings().first()
    feed_res = (await db.execute(feed_query)).scalar() or 0
    
    total_yield = milk_res["total_yield"] or 0
    # Use max to prevent division by zero
    active_cows = max(milk_res["active_cows"] or 0, 1) 
    
    return {
        "total_milk_yield": total_yield,
        "average_per_cow": total_yield / active_cows if milk_res["active_cows"] else 0,
        "total_revenue": milk_res["total_revenue"] or 0,
        "total_feed_cost": feed_res,
        "month": month,
        "year": year
    }

async def get_financial_summary(db: AsyncSession, user_id: UUID, year: int, month: int):
    milk_query = select(
        func.sum(MilkRecord.total_revenue).label("revenue"),
        func.sum(MilkRecord.liters).label("liters")
    ).where(
        MilkRecord.user_id == user_id,
        extract('year', MilkRecord.created_at) == year,
        extract('month', MilkRecord.created_at) == month
    )
    
    feed_query = select(
        func.sum(Feeds.quantity * Feeds.costPerUnit).label("cost")
    ).where(
        Feeds.user_id == user_id,
        extract('year', Feeds.createdAt) == year,
        extract('month', Feeds.createdAt) == month
    )

    milk_res = (await db.execute(milk_query)).mappings().first()
    feed_res = (await db.execute(feed_query)).scalar() or 0
    
    revenue = milk_res["revenue"] or 0
    liters = milk_res["liters"] or 0
    net_amount = revenue - feed_res
    
    return {
        "month_name": datetime(year, month, 1).strftime('%B'),
        "total_liters": liters,
        "milk_revenue": revenue,
        "feed_costs": feed_res,
        "net_balance": net_amount,
        "status": "SURPLUS" if net_amount >= 0 else "DEFICIT"
    }