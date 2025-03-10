import uuid
from sqlmodel import Field, Relationship, SQLModel

from models.event import Event
from models.link import EventActorLink



class ActorBase(SQLModel):
    name: str
    favorite: bool = Field(default= False)
    
    
class Actor(ActorBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    events: list["Event"] = Relationship(back_populates="actors", link_model=EventActorLink)

class ActorPublic(ActorBase):
    id: uuid.UUID

class ActorCreate(ActorBase):
    pass

class ActorUpdate(ActorBase):
    name: str | None = Field(default=None)
    favorite: bool | None = Field(default= False)
    