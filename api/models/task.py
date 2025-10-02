from datetime import UTC, datetime

from sqlmodel import Field, SQLModel


class TaskBase(SQLModel):
    """Shared fields for Task"""

    title: str
    description: str | None = None
    completed: bool = Field(default=False)


class TaskCreate(TaskBase):
    pass


class Task(TaskBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        sa_column_kwargs={"onupdate": lambda: datetime.now(UTC)},
    )
