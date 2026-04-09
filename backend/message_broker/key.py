def task_status_key(task_id: str) -> str:
    return f"task:{task_id}:status"

def task_meta_key(task_id: str) -> str:
    return f"task:{task_id}:meta"

def farm_tasks_key(farm_id: str) -> str:
    return f"farm:{farm_id}:tasks"

def queue_stats_key(queue: str) -> str:
    return f"queue:{queue}:stats"