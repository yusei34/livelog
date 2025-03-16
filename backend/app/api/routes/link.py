import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from ..deps import SessionDep
from models.models import EventActorLink, Event, Actor, Message

router = APIRouter(prefix='/alldata', tags=['EventAndActor'])

@router.post('/', response_model=EventActorLink)
def link_event_and_actor(*, session: SessionDep,  link: EventActorLink) ->Any:
    # event = session.exec(select(Event).where(Event.id == link.event_id)).one()
    # actor = session.exec(select(Actor).where(Actor.id == link.actor_id)).one()
    # link = EventActorLink(event_id= event, actor_id= actor)
    
    db_link = EventActorLink.model_validate(link)
    
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    