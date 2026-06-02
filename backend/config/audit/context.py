import structlog

from contextvars import ContextVar

query_count: ContextVar[int] = ContextVar("query_count", default=0)


def bind_request_context(**kwargs):
    structlog.contextvars.bind_contextvars(**kwargs)


def clear_request_context():
    structlog.contextvars.clear_contextvars()
