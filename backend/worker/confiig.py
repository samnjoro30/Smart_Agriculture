from config.setting import get_settings

settings = get_settings()

CELERY_BROKER_URL = settings.REDIS_URL_BROKER
CELERY_RESULT_BACKEND = settings.REDIS_URL_BROKER  # optional, store task results
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'