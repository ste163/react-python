"""
Test configuration and fixtures for integration tests.

This module provides pytest fixtures for testing the FastAPI application
with a real PostgreSQL database running in Docker.
"""
import os
import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.pool import StaticPool

from main import app
from database import get_session
from models.task import Task


# Test database configuration
TEST_DATABASE_URL = "postgresql://admin:example@localhost:5433/task_manager_test"


@pytest.fixture(name="engine")
def engine_fixture():
    """
    Create a test database engine.
    
    This connects to the postgres-test Docker container on port 5433.
    """
    engine = create_engine(
        TEST_DATABASE_URL,
        echo=False,  # Set to True to see SQL queries during tests
        poolclass=StaticPool,  # Use static pool for testing
    )
    
    # Create all tables
    SQLModel.metadata.create_all(engine)
    
    yield engine
    
    # Drop all tables after tests
    SQLModel.metadata.drop_all(engine)
    engine.dispose()


@pytest.fixture(name="session")
def session_fixture(engine):
    """
    Create a database session for each test.
    
    Uses transaction rollback to ensure test isolation - each test
    gets a clean database state.
    """
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)
    
    yield session
    
    # Rollback transaction to undo all changes made during the test
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(name="client")
def client_fixture(session):
    """
    Create a FastAPI TestClient with the test database session.
    
    This overrides the normal database dependency to use our test session.
    """
    def get_session_override():
        return session
    
    app.dependency_overrides[get_session] = get_session_override
    
    client = TestClient(app)
    
    yield client
    
    app.dependency_overrides.clear()
