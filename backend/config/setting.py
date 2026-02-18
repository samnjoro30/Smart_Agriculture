from functools import lru_cache
from typing import Literal, Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Global application settings.
    Loads automatically from .env
    """

    # core
    APP_NAME: str = "Smart Farm"
    ENV: Literal["dev", "staging", "prod", "test"] = "dev"
    DEBUG: bool = False

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    WORKERS: int = 4

    # Database
    NEON_DB: Optional[str] = None
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30
    DB_POOL_RECYCLE: int = 1800

    # Auth
    JWT_SECRET: Optional[str] = None
    JWT_REFRESH: Optional[str] = None
    ALGORITHM: str = "HS256"
    ACCESS_EXPIRE_MINUTES: int = 15
    REFRESH_EXPIRE_DAY: int = 7

    # Cookies
    COOKIE_SECURE: bool = True
    COOKIE_SAMESITE: Literal["lax", "strict", "none"] = "none"
    COOKIE_HTTPONLY: bool = True

    # Redis
    REDIS_URL: str | None = None
    REDIS_CACHE_TTL: int = 300

    # logs
    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    LOG_JSON: bool = False

    # Cors
    BACKEND_CORS_ORIGINS: list[str] = Field(default_factory=list)

    # rate limiting
    RATE_LIMITING_PER_MINUTE: int = 60
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


# skeleton
@lru_cache
def get_settings() -> Settings:
    return Settings()
