from celery import Celery
from config.setting import get_settings
from worker.celery_config import CELERY_CONFIG

settings = get_settings()

REDIS_CONFIG = {
    "max_connections": 24,
    "socket_timeout": 5,
    "retry_on_timeout": True,
}

def init_celery(app_name: str):
    """Factory to create a Celery app instance."""
    app = Celery(
        app_name,
        broker=CELERY_CONFIG['broker_url'],
        backend=CELERY_CONFIG['result_backend'],
    )

    app.conf.task_routes = {
        "modules.livestock.tasks.*": {"queue": "livestock_service"},
        "modules.nutrition.tasks.*": {"queue": "nutrition_service"},
        "modules.auth.tasks.*": {"queue": "identity_service"},
    }

    app.conf.update(CELERY_CONFIG)

    return app

# Main instance used by the rest of the Monolith
celery_bus = init_celery("smart_agri_bus")