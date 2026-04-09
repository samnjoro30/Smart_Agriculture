from config.setting import get_settings

settings = get_settings()

CELERY_CONFIG = {
    "broker_url": settings.REDIS_URL_BROKER,
    "result_backend": settings.REDIS_URL_BROKER,

    "accept_content": ["json"],
    "task_serializer": "json",
    "result_serializer": "json",

    "timezone": "Africa/Nairobi",
    "enable_utc": True,

    "task_track_started": True,
    "task_time_limit": 30 * 60,

    # Reliability
    "task_acks_late": True,
    "worker_prefetch_multiplier": 1,
    "task_reject_on_worker_lost": True,
}
