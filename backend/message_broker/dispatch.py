from message_broker.observability.lifecycle import on_task_queued

def dispatch_task(task_func, queue: str, *args, **kwargs):
    task = task_func.apply_async(args=args, kwargs=kwargs, queue=queue)

    on_task_queued(task.id, queue)

    return task.id