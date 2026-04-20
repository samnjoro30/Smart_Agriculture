from celery.schedules import crontab

BEAT_SCHEDULE = {
    'calculate-ages-every-midnight': {
        'task': 'update_livestock_ages',
        'schedule': crontab(hour=0, minute=0), # Runs daily at midnight
    },
    'cleanup-archived-animals-weekly': {
        'task': 'cleanup_archived_animals',
        'schedule': crontab(hour=3, minute=0, day_of_week='sunday'), # Runs every Sunday at 3 AM
    },
}