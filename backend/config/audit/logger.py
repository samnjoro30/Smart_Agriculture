import logging
import sys
import structlog
from config.setting import get_settings

settings = get_settings()


def setup_logging():
    """
    Configure structured logging for the entire application.
    Should be called once at startup.
    """

    # 🔧 Log level from settings
    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    # ⏱ Timestamp
    timestamper = structlog.processors.TimeStamper(fmt="iso")

    # 🔗 Shared processors (core pipeline)
    shared_processors = [
        structlog.contextvars.merge_contextvars,  # inject request context
        structlog.processors.add_log_level,
       # structlog.processors.add_logger_name,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        timestamper,
    ]

    # 🎨 Renderer (dev vs prod)
    if settings.ENV == "dev":
        renderer = structlog.dev.ConsoleRenderer()
    else:
        renderer = structlog.processors.JSONRenderer()

    # ⚙️ Structlog configuration
    structlog.configure(
        processors=shared_processors + [renderer],
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        logger_factory=structlog.PrintLoggerFactory(file=sys.stdout),
        cache_logger_on_first_use=True,
    )

    # 🔗 Integrate with standard logging (FastAPI, uvicorn, etc.)
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=log_level,
    )


def get_logger(name: str):
    return structlog.get_logger(name)