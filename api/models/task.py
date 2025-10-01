from sqlmodel import Field, SQLModel
from datetime import datetime, timezone

class TaskBase(SQLModel):
    """Shared fields for Task"""
    title: str
    description: str | None = None
    completed: bool = Field(default=False)

class TaskCreate(TaskBase):
    pass

class Task(TaskBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)})
