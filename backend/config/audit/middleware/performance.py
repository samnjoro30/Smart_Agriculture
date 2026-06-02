import time
from config.audit.logger import get_logger
from fastapi import Request
from config.audit.context import query_count

logger = get_logger("PERFORMANCE")


async def performance_middleware(request: Request, call_next):
    start_time = time.perf_counter()

    query_count.set(0)
    # Track request info
    path = request.url.path
    method = request.method

    try:
        response = await call_next(request)
    except Exception as e:
        duration = time.perf_counter() - start_time

        logger.error(f"[ERROR] {method} {path} failed in {duration:.3f}s")
        raise e

    duration = time.perf_counter() - start_time
    total_queries = query_count.get()

    # Add header
    response.headers["X-Process-Time"] = str(duration)
    response.headers["X-DB-Queries"] = str(total_queries)

    # Log based on speed
    if duration > 2:
        logger.warning(
            f"[SLOW] {method} {path} took {duration:.3f}s | DB queries: {total_queries}"
        )
    else:
        logger.info(
            f"{method} {path} took {duration:.3f}s | DB queries: {total_queries}"
        )

    return response
