# react-python
A simple task manager app for exploring a python-based API with automatic TypeScript type generation.

## Features
- Python formatting and linting using ruff (automatic through husky and lint-staged)
- Backend integration tests running on pre-push
- Automatic TypeScript type generation from FastAPI OpenAPI spec
- Hot-reloading: API changes automatically update client TypeScript types

## Stack
- Database: Postgres (Docker)
- Backend API: Python, SQLModel (ORM), FastAPI, Alembic (migrations) 
- Frontend: React, TypeScript, Vite
- Type Generation: openapi-typescript

## Quick Start

### Development (Both API and Client)
#### Database
Spin up Postgres docker container
```sh
docker compose up
```

Run both servers concurrently with automatic type generation:
```sh
npm run dev
```

This will:
1. Start the FastAPI server (http://127.0.0.1:8000)
2. Start the Vite dev server (http://localhost:5173)
3. Automatically export OpenAPI schema when the API changes
4. Automatically regenerate TypeScript types when the schema changes

### Running Separately
### API
Setup virtual env
```sh
cd ./api &&
python -m venv venv
```

Activate env
```sh
cd ./api &&
source venv/bin/activate
```

Install packages
```sh
cd ./api &&
pip install -r requirements.txt
```

Run API with 
```sh
fastapi dev main.py
```

Swagger available at: [127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Migrations
After the env is setup and dependencies installed, run the migrations:
```sh
alembic upgrade head
```

For development, if changes to a models have occurred:
```sh
# generate the migration
alembic revision --autogenerate -m "What you changed"
```

Then to apply the migration
```sh
alembic upgrade head
```

## Testing

### API
Integration testing suite with a separate DB running in docker.

### Running Tests

```sh
npm run api:test
```
