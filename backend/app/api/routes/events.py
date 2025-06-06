import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select,or_
from ..deps import SessionDep
from models.models import Event, EventCreate, EventsPublic, EventPublic, EventUpdate, Message ,EventActorLink, EventRead, Actor


router = APIRouter(prefix="/events", tags=["events"])

@router.post('/', response_model= EventPublic)
def create_event(*, session: SessionDep, event: EventCreate, actor_ids: list[uuid.UUID]) -> Any:
    """
    Create new event.
    """
    db_event = Event.model_validate(event)
    for actor_id in actor_ids:
        actor = session.get(Actor, actor_id)
        if actor:
            db_event.actors.append(actor)
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event

@router.get('/', response_model=EventsPublic)
def read_events(
    *, session: SessionDep, 
    skip: int = 0, limit: int = Query(default=20, le=20),
    q: str | None = Query(default=None,)
) -> Any :
    """
    Retrieve events.
    """
    if q:
        result = select(Event).where(or_(Event.title.ilike(f'%{q}%'),
                                        #  Event.venue.ilike(f'%{q}%') #会場名も含めて検索場合はコメント外す
                                         ))
    events = session.exec(result.offset(skip).limit(limit)).all()
    return EventsPublic(data=events)

@router.get('/{event_id}', response_model= EventRead)
def read_event(
    *, session:SessionDep, event_id: uuid.UUID, 
) -> Any:
    """
    Get event by ID.
    """
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail='Event Not Found')
    return event


@router.put('/{event_id}', response_model= EventPublic)
def update_event(
    *, session: SessionDep, event_id: uuid.UUID,event: EventUpdate, actor_ids: list[uuid.UUID]
) -> Any:
    """
    Update an event.
    """     
    db_event = session.get(Event, event_id)
    
    if not db_event:
        raise HTTPException(status_code= 404, detail='Event Not Found')
    
    update_data = event.model_dump(exclude_unset= True)
    db_event.sqlmodel_update(update_data)
    
    db_event.actors.clear()
    
    for actor_id in actor_ids:
        actor = session.get(Actor, actor_id)
        if actor:
            db_event.actors.append(actor)
    
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



