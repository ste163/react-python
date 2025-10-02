"""
Integration tests for the Tasks API.

These tests make real HTTP requests to the FastAPI application and verify
the complete request/response cycle including database operations.

Tests are organized by endpoint with negative scenarios first.
"""
from fastapi.testclient import TestClient
from sqlmodel import Session, select

from models.task import Task


# POST /tasks/ - Create Task Tests
# ================================

def test_create_task_missing_title(client: TestClient):
    task_data = {
        "description": "No title provided"
    }
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 422  # Validation error

def test_create_task_success(client: TestClient, session: Session):
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "completed": False
    }
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 200
    data = response.json()
    # Verify response data
    assert data["title"] == task_data["title"]
    assert data["description"] == task_data["description"]
    assert data["completed"] == task_data["completed"]
    assert "id" in data
    
    # Verify timestamps are present and correct format
    assert data["created_at"] is not None
    assert data["updated_at"] is not None
    assert isinstance(data["created_at"], str)
    assert isinstance(data["updated_at"], str)
    
    # Verify task was created in database
    task_id = data["id"]
    statement = select(Task).where(Task.id == task_id)
    db_task = session.exec(statement).first()
    
    assert db_task is not None
    assert db_task.title == task_data["title"]
    assert db_task.description == task_data["description"]
    assert db_task.completed == task_data["completed"]

def test_create_task_minimal_with_defaults(client: TestClient):
    task_data = {
        "title": "Minimal Task"
    }
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["title"] == "Minimal Task"
    assert data["description"] is None
    assert data["completed"] is False  # Should default to False
    assert data["created_at"] is not None
    assert data["updated_at"] is not None

def test_create_task_completed(client: TestClient):
    task_data = {
        "title": "Already Done",
        "completed": True
    }
    response = client.post("/tasks/", json=task_data)
    
    assert response.status_code == 200
    assert response.json()["completed"] is True


# GET /tasks/ - Get All Tasks Tests
# ==================================

def test_get_all_tasks_empty(client: TestClient):
    """Test GET /tasks/ returns empty list when no tasks exist."""
    response = client.get("/tasks/")
    
    assert response.status_code == 200
    assert response.json() == []

def test_get_all_tasks_returns_all(client: TestClient):
    """Test GET /tasks/ returns all tasks with complete data."""
    # Create multiple tasks
    tasks_data = [
        {"title": "Task 1", "description": "First task"},
        {"title": "Task 2", "description": "Second task"},
        {"title": "Task 3", "completed": True}
    ]
    
    for task_data in tasks_data:
        client.post("/tasks/", json=task_data)
    
    # Get all tasks
    response = client.get("/tasks/")
    
    assert response.status_code == 200
    
    data = response.json()
    assert len(data) == 3
    
    # Verify all tasks have complete field structure
    for task in data:
        assert "id" in task
        assert "title" in task
        assert "description" in task
        assert "completed" in task
        assert "created_at" in task
        assert "updated_at" in task
