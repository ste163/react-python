import os

from pydantic_settings import BaseSettings

env = os.getenv("ENVIRONMENT")
if not env:
    raise RuntimeError("ENVIRONMENT variable must be set (e.g. 'local', 'e2e'")


class Settings(BaseSettings):
    database_url: str
    test_database_url: str = ""
    allowed_origins: str = ""

    class Config:
        env_file = f"../.env.{env}"
        env_file_encoding = "utf-8"


settings = Settings()
