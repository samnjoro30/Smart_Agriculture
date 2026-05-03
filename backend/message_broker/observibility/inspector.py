from message_broker.config import celery_bus


def get_active_tasks():
    i = celery_bus.control.inspect()
    return i.active()


def get_reserved_tasks():
    i = celery_bus.control.inspect()
    return i.reserved()


def get_worker_stats():
    i = celery_bus.control.inspect()
    return i.stats()
