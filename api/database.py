import os

from dotenv import load_dotenv
from sqlmodel import Session, create_engine

load_dotenv("../.env.local")

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL, echo=True)  # echo=True shows SQL queries in logs


def get_session():
    """Get a database session - use this in your API endpoints"""
    with Session(engine) as session:
        yield session
