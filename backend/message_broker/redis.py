import redis.asyncio as redis
from config.setting import get_settings

settings = get_settings()

redis_client = redis.Redis.from_url(
    settings.REDIS_URL_BROKER,
    decode_responses=True,
    max_connections=50,
)
