from fastapi import FastAPI
from routers.tasks import router as tasks_router

app = FastAPI(title="Task Manager API", version="1.0.0")

app.include_router(tasks_router)
