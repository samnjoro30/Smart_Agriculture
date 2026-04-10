from datetime import datetime
from celery import shared_task
from config.database import AsyncSessionLocal 
from sqlalchemy.ext.asyncio import AsyncSession
from .service import update_livestock_ages_service
from message_broker.config import celery_bus
import asyncio
#from .repostory import LivestockRepository
from .model import Livestock


#calculating the age and updating ages in the database
@celery_bus.task(name="modules.livestock.tasks.update_livestock_ages")
def update_livestock_ages():
    async def run():
        async with AsyncSessionLocal() as db:
            return await update_livestock_ages_service(db)
    
    updated_count = asyncio.run(run())
    
    return {"updated_count": updated_count}

def heat_cycle_metrics(last_insemination: datetime | None, pregnant: bool):
    if pregnant:
        return {
            "next_heat": None,
            "status": "Pregnant"
        }

    if not last_insemination:
        return {
            "next_heat": None,
            "status": "No data"
        }

    next_heat = last_insemination + timedelta(days=21)

    return {
        "next_heat": next_heat,
        "days_remaining": (next_heat - datetime.utcnow()).days,
        "status": "Expected"
    }

def last_insemination(heat_status: bool, last_insemination: datetime | None):
    if heat_status:
        return last_insemination
    return None
    pass