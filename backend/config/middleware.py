import time
import uuid
from fastapi import Request
from starlette.responses import JSONResponse
from config.logger import get_logger

logger = get_logger("AUDIT")


async def audit_middleware(request: Request, call_next):
    start_time = time.time()

    request_id = str(uuid.uuid4())
    request.state.request_id = request_id

    # 🌍 Client IP
    client_ip = request.client.host if request.client else "unknown"

    try:
        response = await call_next(request)

    except Exception as e:
        duration = round(time.time() - start_time, 3)

        logger.exception(
            "Unhandled exception",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "ip": client_ip,
                "duration": duration,
            },
        )

        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
        )

    duration = round(time.time() - start_time, 3)

    # 🐢 Slow request detection
    if duration > 1:
        logger.warning(
            "Slow request",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration": duration,
                "ip": client_ip,
            },
        )
    else:
        logger.info(
            "Request completed",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration": duration,
                "ip": client_ip,
            },
        )

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"

    return response