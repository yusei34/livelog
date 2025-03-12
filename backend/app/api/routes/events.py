import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from ..deps import SessionDep
from models.models import Event, EventCreate, EventPublic, EventUpdate, Message ,EventActorLink


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
    session:SessionDep, event_id: uuid.UUID, 
) -> Any:
    """
    Get event by ID.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail='Event Not Found')
    return event

@router.post('/', response_model= EventPublic)
def create_event(session:SessionDep, event: EventCreate) -> Any:
    """
    Create new event.
    """
    db_event = Event.model_validate(event)
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event

@router.put('/{event_id}', response_model= EventPublic)
def update_event(
    session: SessionDep, event_id: uuid.UUID, event: EventUpdate 
) -> Any:
    """
    Update an event.
    """
    db_event = session.get(Event, event_id)
    if not db_event:
        raise HTTPException(status_code= 404, detail='Event Not Found')
    update_data = event.model_dump(exclude_unset= True)
    db_event.sqlmodel_update(update_data)
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event
    
@router.delete('/{event_id}', response_model= Message)
def delete_event(session: SessionDep, event_id: uuid.UUID) -> Any:
    """
    Delete an event.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code= 404, detail='Event Not Found')
    session.delete(event)
    session.commit()
    return Message(message='Event deleted successfully')



