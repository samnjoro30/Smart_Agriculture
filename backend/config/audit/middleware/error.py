import time
from fastapi import Request
from starlette.responses import JSONResponse
from config.audit.logger import get_logger

logger = get_logger("ERROR")


async def error_middleware(request: Request, call_next):
    start_time = time.time()

    try:
        response = await call_next(request)
        return response

    except Exception:
        duration = round(time.time() - start_time, 3)

        logger.exception(
            "Unhandled exception",
            duration=duration,
        )

        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )