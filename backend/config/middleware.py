import time
from .logger import get_logger
from fastapi import Request

logger = get_logger(__name__)


async def logging_middleware(request: Request, call_next):
    start = time.time()

    response = await call_next(request)

    duration = round(time.time() - start, 3)

    logger.info(
        f"{request.method} {request.url.path} "
        f"{response.status_code} {duration}s"
    )

    return response
