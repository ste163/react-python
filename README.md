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
Note: once the app has been fully setup, the root `package.json` contains commands for running the client and api

### One-time setup
#### Node package installs
From root
```sh
npm i
```

From `/client`
```sh
npm i
```

#### Database
Spin up Postgres docker containers
```sh
docker compose up
```

##### API package install
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

##### Run migrations
```sh
cd ./api &&
alembic upgrade head
```

### Development (Both API and Client)

Run both servers concurrently with automatic type generation:
```sh
npm run dev
```

This will:
1. Start the FastAPI server (http://127.0.0.1:8000)
2. Start the Vite dev server (http://localhost:5173)
3. Automatically export OpenAPI schema when the API changes
4. Automatically regenerate TypeScript types when the schema changes


Swagger available at: [127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Migrations
To create new migrations, after models have been added or removed:
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
