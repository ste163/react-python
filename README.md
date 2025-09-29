# react-python

## Stack
- Postgres running in Docker
- Backend API: Python, SQLModel (ORM), FastAPI

## Running
### Database
Spin up Postgres docker container
```sh
docker compose up
```

### API
Setup virtual env
```sh
cd ./api
python -m venv .venv
```

Activate env
```sh
cd ./api
source .venv/bin/activate
```

Install packages
```sh
cd ./api
pip install -r requirements.txt
```