import uuid
from sqlmodel import Field, SQLModel


class EventActorLink(SQLModel, table=True):
    event_id:uuid.UUID= Field(default= None, foreign_key= "event.id", primary_key= True)
    actor_id:uuid.UUID= Field(default= None, foreign_key= "actor.id", primary_key= True)