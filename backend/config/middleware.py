import time
from starlette.middleware.base import BaseHTTPMiddleware
from config.logger import get_logger

logger = get_logger("REQUEST")


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start = time.time()

        response = await call_next(request)

        duration = round(time.time() - start, 3)

        logger.info(
            f"{request.method} {request.url.path} "
            f"{response.status_code} {duration}s"
        )

        return response
