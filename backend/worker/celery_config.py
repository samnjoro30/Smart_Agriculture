import ssl
import os
import certifi
from config.setting import get_settings
import worker.models

settings = get_settings()

ISPRODUCTION = os.getenv("RENDER", "false").lower() == "true"

broker_url = settings.REDIS_URL_BROKER or ""

CELERY_CONFIG = {
    "broker_url": broker_url,
    "result_backend": broker_url,
    "accept_content": ["json"],
    "task_serializer": "json",
    "result_serializer": "json",
    "timezone": "Africa/Nairobi",
    "enable_utc": True,
    "task_track_started": True,
    "task_time_limit": 30 * 60,
    # Reliability
    "task_acks_late": True,
    "worker_prefetch_multiplier": 1,
    "task_reject_on_worker_lost": True,
}

if ISPRODUCTION:
    # Use strict SSL for Render
    ssl_conf = {
        "ssl_cert_reqs": ssl.CERT_REQUIRED,
        "ca_certs": certifi.where(),
    }
    CELERY_CONFIG["broker_use_ssl"] = ssl_conf
    CELERY_CONFIG["redis_backend_use_ssl"] = ssl_conf
else:
    # Handle local dev logic
    if broker_url.startswith("rediss"):
        CELERY_CONFIG["broker_use_ssl"] = {"ssl_cert_reqs": ssl.CERT_NONE}
        CELERY_CONFIG["redis_backend_use_ssl"] = {"ssl_cert_reqs": ssl.CERT_NONE}
