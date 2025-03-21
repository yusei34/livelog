from fastapi import FastAPI
from api.routes import events, actors, expenses
from core.db import create_db_tables

app = FastAPI()

app.include_router(events.router)
app.include_router(actors.router)
app.include_router(expenses.router)
