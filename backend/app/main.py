from fastapi import FastAPI
from app.api.endpoints import events 
from app.core.db import create_db_tables

app = FastAPI()

@app.on_event('startup')
def on_startup():
    create_db_tables()


app.include_router(events.router)