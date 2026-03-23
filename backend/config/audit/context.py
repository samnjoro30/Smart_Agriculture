import structlog

def bind_request_context(**kwargs):
    structlog.contextvars.bind_contextvars(**kwargs)

def clear_request_context():
    structlog.contextvars.clear_contextvars()