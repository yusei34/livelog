from fastapi import FastAPI
from api.routes import events, actors, expenses, link
from core.db import create_db_tables

app = FastAPI()

# @app.on_event('startup')
# def on_startup():
#     create_db_tables()


app.include_router(events.router)
app.include_router(actors.router)
app.include_router(expenses.router)
app.include_router(link.router)