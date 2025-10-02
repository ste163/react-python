from typing import List
from sqlmodel import Session, select
from models.task import Task, TaskCreate

class TaskService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_tasks(self) -> List[Task]:
        """Get all tasks"""
        statement = select(Task)
        tasks = self.db.exec(statement).all()
        return tasks

    def create_task(self, task_create: TaskCreate) -> Task:
        """Create a new task"""
        task = Task.model_validate(task_create)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task