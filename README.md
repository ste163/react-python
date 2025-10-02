# react-python
A simple task manager app for exploring a python-based API.

- Includes python formatting and linting using ruff that's automatic through husky and lint-staged.
- Includes backend integration tests running on pre-push

## Stack
- Postgres running in Docker
- Backend API: Python, SQLModel (ORM), FastAPI, Alembic (migrations) 
- Frontend: react

## Running
### Database
Spin up Postgres docker container
```sh
docker compose up
```

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

### Migrations
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