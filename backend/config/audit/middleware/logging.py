import time
from fastapi import Request
from config.audit.logger import get_logger
from config.setting import get_settings
from config.audit.context import clear_request_context

settings = get_settings()
logger = get_logger("AUDIT")


async def logging_middleware(request: Request, call_next):
    start_time = time.time()

    try:
        response = await call_next(request)

        duration = round(time.time() - start_time, 3)

        threshold = getattr(settings, "SLOW_REQUEST_THRESHOLD", 1)

        if duration > threshold:
            logger.warning(
                "Slow request",
                status_code=response.status_code,
                duration=duration,
            )
        else:
            logger.info(
                "Request completed",
                status_code=response.status_code,
                duration=duration,
            )

        return response

    finally:
        clear_request_context()
