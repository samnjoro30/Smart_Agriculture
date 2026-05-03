def task_status_key(task_id: str) -> str:
    return f"task:{task_id}:status"


def task_meta_key(task_id: str) -> str:
    return f"task:{task_id}:meta"


def farm_tasks_key(farm_id: str) -> str:
    return f"farm:{farm_id}:tasks"


def queue_stats_key(queue: str) -> str:
    return f"queue:{queue}:stats"


def queue_count_key(queue: str) -> str:
    return f"smartfarm:queue:{queue}:count"


def queue_processing_key(queue: str) -> str:
    return f"smartfarm:queue:{queue}:processing"


def task_timeline_key(task_id: str) -> str:
    return f"smartfarm:task:{task_id}:timeline"
