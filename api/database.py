from sqlmodel import Session, create_engine

from config.env import settings

# echo=True shows SQL queries in logs
engine = create_engine(settings.database_url, echo=False)


def get_session():
    """Get a database session - use this in your API endpoints"""
    with Session(engine) as session:
        yield session
