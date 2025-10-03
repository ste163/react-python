import json
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI

from routers.tasks import router as tasks_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Export OpenAPI schema
    print("📝 Exporting OpenAPI schema...")
    try:
        openapi_schema = app.openapi()
        project_root = Path(__file__).parent.parent
        output_path = project_root / "client" / "src" / "types" / "openapi.json"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with output_path.open("w") as f:
            json.dump(openapi_schema, f, indent=2)
        print(f"✅ OpenAPI schema exported to {output_path}")
    except Exception as e:
        print(f"❌ Error exporting schema: {e}")

    yield

    # Shutdown: cleanup if needed
    print("👋 Shutting down...")


app = FastAPI(title="Task Manager API", version="1.0.0", lifespan=lifespan)

app.include_router(tasks_router)
