from celery import Celery
from .config import CELERY_BROKER_URL, CELERY_RESULT_BACKEND

celery_app = Celery(
    "smartfarm",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
)

# Optional: auto-discover tasks in modules
celery_app.autodiscover_tasks([
    "modules.auth.tasks",
    "modules.livestock.tasks",
    "modules.nutrition.tasks",
])