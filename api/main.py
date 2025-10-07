import json
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.logging_config import setup_logging
from routers.tasks import router as tasks_router

setup_logging()

logging = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("Exporting OpenAPI Schema")
    try:
        openapi_schema = app.openapi()
        project_root = Path(__file__).parent.parent
        output_path = project_root / "client" / "src" / "types" / "openapi.json"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with output_path.open("w") as f:
            json.dump(openapi_schema, f, indent=2)
        logging.info(f"OpenAPI schema exported to {output_path}")
    except Exception as e:
        logging.error(f"Error exporting schema: {e}")

    yield
    logging.info("Shutting down...")


app = FastAPI(title="Task Manager API", version="1.0.0", lifespan=lifespan)

env_file = f".env.{os.getenv('ENVIRONMENT', 'local')}"
load_dotenv(env_file)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)
