from datetime import datetime
from celery import shared_task
from config.database import AsyncSessionLocal
#from .repostory import LivestockRepository
from .model import Livestock

#changing time to human-readable
def make_naive(dt: datetime | None):
    if dt and dt.tzinfo is not None:
        return dt.replace(tzinfo=None)
    return dt

#calculating the age and updating ages in the database
@shared_task(name="modules.livestock.tasks.update_livestock_ages")
def update_livestock_ages(birth_date: datetime, current_date: datetime) -> dict:
    db = AsyncSessionLocal()

    try:
        current_date = datetime.utcnow()
        animals = db.query(Livestock).all()
        for animal in animals:
            if animal.birthDate:
                birth_date = make_naive(animal.birthDate)
                delta_days = (current_date - birth_date).days
                animal.age = delta_days // 365

        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

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