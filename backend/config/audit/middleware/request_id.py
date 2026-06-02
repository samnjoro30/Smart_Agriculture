import uuid
from fastapi import Request
from config.audit.context import bind_request_context


async def request_id_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    client_ip = request.client.host if request.client else "unknown"

    # 🔗 bind base context
    bind_request_context(
        request_id=request_id,
        ip=client_ip,
        method=request.method,
        path=request.url.path,
    )

    response = await call_next(request)

    response.headers["X-Request-ID"] = request_id

    return response
