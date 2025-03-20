import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from ..deps import SessionDep
from models.models import Actor, ActorCreate, ActorPublic, ActorsPublic, ActorRead, ActorUpdate, Event, Message

router = APIRouter(prefix="/actors", tags=["actors"])

@router.post("/", response_model=ActorPublic)
def create_actor(*, session: SessionDep, actor: ActorCreate, event_ids: list[uuid.UUID]) ->Any:
    
    db_actor = Actor.model_validate(actor)
    
    for event_id in event_ids:
        event = session.get(Event, event_id)
        if event:
            db_actor.events.append(event)
    
    session.add(db_actor)
    session.commit()
    session.refresh(db_actor)
    
    return db_actor

@router.get("/", response_model=ActorsPublic)
def read_actors(*, session:SessionDep, offset: int = 0, limit: int = Query(default=20, le=20)) ->Any:
    
    actors = session.exec(select(Actor).offset(offset).limit(limit)).all()
    
    return ActorsPublic(data=actors)

@router.get("/{actor_id}", response_model=ActorRead)
def read_actor(*, session:SessionDep, actor_id: uuid.UUID) ->Any:
    
    actor = session.get(Actor, actor_id)
    
    if not actor:
        raise HTTPException(status_code=404, detail="Actor Not Found")
    
    return actor

@router.put("/{actor_id}", response_model=ActorPublic)
def update_actor(*, session: SessionDep, actor_id: uuid.UUID, actor: ActorUpdate, event_ids: list[uuid.UUID]) ->Any:
    
    db_actor = session.get(Actor, actor_id)
    
    if not db_actor:
        raise HTTPException(status_code=404, detail="Actor Not Found")
    
    update_data = actor.model_dump(exclude_unset=True)
    db_actor.sqlmodel_update(update_data)
    
    db_actor.events.clear()
    
    for event_id in event_ids:
        event = session.get(Event, event_id)
        if event:
            db_actor.events.append(event)
    
    session.add(db_actor)
    session.commit()
    session.refresh(db_actor)
    
    return db_actor

@router.delete("/{actor_id}", response_model=Message)
def delete_actor(*, session: SessionDep, actor_id: uuid.UUID) ->Any:
    
    actor = session.get(Actor, actor_id)
    
    if not actor:
        raise HTTPException(status_code=404, detail="Actor Not Found")
    
    session.delete(actor)
    session.commit()
    
    return Message(message='Actor deleted successfully')
