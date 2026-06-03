
from slowapi import Limiter
from slowapi.util import get_remote_address
from config.setting import get_settings

settings = get_settings()

limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=settings.REDIS_URL_CACHE,
    default_limits=["100/minute"],
    headers_enabled=True,
    storage_options={
        "socket_connect_timeout": 5,
        "socket_timeout": 5,
        "retry_on_timeout": True,
    },
)