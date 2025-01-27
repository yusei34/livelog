from fastapi import FastAPI

from app.api.endpoints import events 

app = FastAPI()
app.include_router(events.router)