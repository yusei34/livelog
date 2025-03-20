import uuid
from datetime import date
from sqlmodel import Field, Relationship, SQLModel

class EventActorLink(SQLModel, table=True):
    event_id:uuid.UUID | None = Field(default= None, foreign_key= "event.id", primary_key= True)
    actor_id:uuid.UUID | None = Field(default= None, foreign_key= "actor.id", primary_key= True)
    
#     # event: 'Event' = Relationship(back_populates='actors')
#     # actor: 'Actor' = Relationship(back_populates='events')


class EventBase(SQLModel):
    title: str
    venue: str
    event_date: date | None
    

# # テーブルモデル
class Event(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    expenses: list['Expense'] = Relationship(back_populates='event', cascade_delete=True)
    actors: list['Actor'] = Relationship(back_populates='events', link_model=EventActorLink)
    
class EventCreate(EventBase):
    pass
    

class EventPublic(EventBase):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    
    
class EventsPublic(SQLModel):
    data: list[EventPublic]


class ActorBase(SQLModel):
    name: str
    favorite: bool = Field(default= False)
    
class Actor(ActorBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    events: list['Event'] = Relationship(back_populates="actors", link_model=EventActorLink)


class ActorPublic(ActorBase):
    id: uuid.UUID
    
    events: list['Event'] = []

class ActorsPublic(SQLModel):
    data: list[ActorPublic]
    
class ActorCreate(ActorBase):
    pass

class ActorUpdate(ActorBase):
    name: str | None = Field(default=None)
    favorite: bool | None = Field(default= False)
    
    events: list['Event'] = []

class ExpenseBase(SQLModel):
    category: str
    item_name: str
    amount: int
    
    event_id: uuid.UUID | None = Field(default=None, foreign_key='event.id', ondelete='CASCADE')
    
    
class ExpensePublic(ExpenseBase):
    id: uuid.UUID 
    
class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    category: str | None  = None
    item_name: str | None = None
    amount: int | None = None
    
class Expense(ExpenseBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    event: Event | None = Relationship(back_populates='expenses')
    
class ExpenseInEvent(ExpensePublic):
    event: EventPublic | None = None

class EventRead(EventPublic):
    actors: list['Actor'] = []
    expenses: list['ExpensePublic'] = []

class EventUpdate(EventBase):
    title: str | None = None
    venue: str | None = None
    event_date: date | None = None
    
    actors: list['Actor'] = []
    
# 共通メッセージおよび認証関連のモデル
# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str |  None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


    
    
    

    





    


    

