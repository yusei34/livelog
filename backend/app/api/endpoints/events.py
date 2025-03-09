import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from app.core.db import SessionDep
from app.models import EventBase,Event, EventCreate, EventPublic, EventUpdate, Message ,EventActorLink


router = APIRouter(prefix="/events", tags=["events"])

@router.get('/', response_model=list[EventPublic])
def read_events(
    session: SessionDep, skip: int = 0, limit: int = Query(default=20, le=20)
) -> Any :
    """
    Retrieve events.
    """
    events = session.exec(select(Event).offset(skip).limit(limit)).all()
    return events

@router.get('/{event_id}', response_model= EventPublic)
def read_event(
    event_id: uuid.UUID, session:SessionDep
) -> Any:
    """
    Get event by ID.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail='event is not found')
    return event

@router.post('/', response_model= EventPublic)
def create_event(event_in: EventCreate, session:SessionDep) -> Any:
    """
    Create new event.
    """
    event = Event.model_validate(event_in)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event

@router.put('/{event_id}', response_model= EventPublic)
def update_event(
    event_id: uuid.UUID, event_in: EventUpdate, session: SessionDep
) -> Any:
    """
    Update an event.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code= 404, detail='event is not found')
    update_data = event_id.model_dump(exclude_unset= True)
    event.sqlmodel_update(update_data)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event
    
@router.delete('/{event_id}', response_model= Message)
def delete_event(event_id: uuid.UUID, session: SessionDep) -> Any:
    """
    Delete an event.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code= 404, detail='event is not found')
    session.delete(event)
    session.commit()
    return Message(message='event deleted successfully')



