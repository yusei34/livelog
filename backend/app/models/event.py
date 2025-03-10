import uuid
from datetime import date
from sqlmodel import Field, Relationship, SQLModel

from models.actor import Actor
from models.link import EventActorLink

class EventBase(SQLModel):
    title: str
    venue: str
    event_date: date | None
    
    # expense_id: uuid.UUID | None = Field(default=None, foreign_key='expense.id')
    

# テーブルモデル
class Event(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # expense: Expense | None = Relationship(back_populates='event')
    
    actors: list['Actor'] = Relationship(back_populates='events', link_model=EventActorLink)
    
class EventCreate(EventBase):
    pass

class EventPublic(EventBase):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)

class EventUpdate(EventBase):
    title: str | None = None
    venue: str | None = None
    event_date: date | None = None