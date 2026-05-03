from datetime import datetime, timedelta
from celery import shared_task
from config.database import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from .service import (
    update_livestock_ages_service,
)
from .repository import purge_old_archives
from message_broker.config import celery_bus
import asyncio

# from .repostory import LivestockRepository
from .model import Livestock


# calculating the age and updating ages in the database
@celery_bus.task(name="modules.livestock.tasks.update_livestock_ages")
def update_livestock_ages():
    async def run():
        async with AsyncSessionLocal() as db:
            return await update_livestock_ages_service(db)

    updated_count = asyncio.run(run())

    return {"updated_count": updated_count}


@celery_bus.task(name="modules.livestock.tasks.cleanup_archived_animals")
def cleanup_archived_animals():
    async def run():
        async with AsyncSessionLocal() as db:
            deleted_count = await purge_old_archives(db)

            return deleted_count

    cleanup_result = asyncio.run(run())

    return {"status": "success", "permanently_removed": cleanup_result}


def heat_cycle_metrics(last_insemination: datetime | None, pregnant: bool):
    if pregnant:
        return {"next_heat": None, "status": "Pregnant"}

    if not last_insemination:
        return {"next_heat": None, "status": "No data"}

    next_heat = last_insemination + timedelta(days=21)

    return {
        "next_heat": next_heat,
        "days_remaining": (next_heat - datetime.utcnow()).days,
        "status": "Expected",
    }


def last_insemination(heat_status: bool, last_insemination: datetime | None):
    if heat_status:
        return last_insemination
    return None
    pass
