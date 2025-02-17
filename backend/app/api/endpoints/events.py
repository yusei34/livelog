import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from app.core.db import SessionDep
from app.models import Event, EventActorLink, EventCreate, EventPublic, EventUpdate, Message


import backend.app.models as events_schema

router = APIRouter(prefix="/events", tags=["events"])

@router.get('/', response_model=list[EventPublic])
async def read_events(
    session: SessionDep, skip: int = 0, limit: int = Query(default=20, le=20)
) -> Any :
    """
    Retrieve heroes.
    """
    events = session.exec(select(Event).offset(skip).limit(limit)).all()
    return events
    

@router.post('/events',response_model=events_schema.Events)
async def create_events(events_body: events_schema.EventsCreate):
    return events_schema.Events(id=1,**events_body.dict())

@router.get('/events/{events_id}',response_model = events_schema.Events)
async def read_events(events_id: int):
    return events_schema.Events

@router.put('/events/{events_id}', response_model=events_schema.Events)
async def update_events(events_id: int, events_body:events_schema.EventsCreate ):
    return events_schema.Events(id=events_id, **events_body.dict())

@router.delete('/events/{events_id}', response_model=None)
async def delete_events(events_id: int):
    return