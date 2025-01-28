import datetime
from pydantic import BaseModel, Field

class EventsBase(BaseModel):
    name:str = Field(str, examples='ARABAKI ROCK FEST')
    venue:str 
    date:datetime.date
    ticket_status:str | None = None #あとでenumに修正
    expense:int | None = None
    

class Events(EventsBase):
    id:int 

class EventsCreate(EventsBase):
    pass