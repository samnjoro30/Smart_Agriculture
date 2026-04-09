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
    app = Celery(app_name)

    app.conf.update(CELERY_CONFIG)
    
    return app

# Main instance used by the rest of the Monolith
celery_bus = init_celery("smart_agri_bus")