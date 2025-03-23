from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import events, actors, expenses


app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events.router)
app.include_router(actors.router)
app.include_router(expenses.router)
