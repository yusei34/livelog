from fastapi import FastAPI
from api.routes import events, actor
from core.db import create_db_tables

app = FastAPI()

# @app.on_event('startup')
# def on_startup():
#     create_db_tables()


app.include_router(events.router)
app.include_router(actor.router)