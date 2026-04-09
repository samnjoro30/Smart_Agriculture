from celery.schedules import crontab

BEAT_SCHEDULE = {
    'calculate-ages-every-midnight': {
        'task': 'update_livestock_ages',
        'schedule': crontab(hour=0, minute=0), # Runs daily at midnight
    },
}