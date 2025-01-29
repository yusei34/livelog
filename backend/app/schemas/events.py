from datetime import date
from pydantic import BaseModel, Field
from enum import Enum

class TicketStatus(str,Enum):
    ON_APPLICATION = '申込中'
    PURCHASED = '購入済'
    REJECTION = '落選' 


class EventsBase(BaseModel):
    name:str = Field(..., examples=['ARABAKI ROCK FEST'])
    venue:str = Field(..., examples=['国営みちのく杜の湖畔公園'])
    date:date
    ticket_status:TicketStatus | None = None #あとでenumに修正
    expense:int | None = None
    
#レスポンス
class Events(EventsBase):
    id:int 
    
    class Config:
        orm_mode = True
    
class EventsCreate(EventsBase):
    pass

