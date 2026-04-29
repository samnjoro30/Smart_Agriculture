from celery import Celery
from .celery_config import CELERY_CONFIG
from .beat import BEAT_SCHEDULE


celery_app = Celery(
    "smartfarm_worker"
)
celery_app.conf.beat_schedule = BEAT_SCHEDULE
celery_app.conf.update(CELERY_CONFIG)


# Optional: auto-discover tasks in modules
celery_app.autodiscover_tasks([
    "modules.auth.tasks",
    "modules.livestock.tasks",
    "modules.nutrition.tasks",
    "modules.notifications.tasks",
])