from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session

from database import get_session
from models.task import Task, TaskCreate
from services.tasks import TaskService

router = APIRouter(prefix="/tasks", tags=["tasks"])


def get_task_service(db: Annotated[Session, Depends(get_session)]) -> TaskService:
    return TaskService(db)


@router.get("/", response_model=list[Task])
def get_all_tasks(service: Annotated[TaskService, Depends(get_task_service)]):
    """Get all tasks"""

    return service.get_all_tasks()


@router.post("/", response_model=Task)
def create_task(
    task: TaskCreate, service: Annotated[TaskService, Depends(get_task_service)]
):
    """Create a new task"""
    return service.create_task(task)
