import datetime
from pydantic import BaseModel, Field


class Events(BaseModel):
    id:int 
    name:str
    venue:str
    date:datetime.date
    ticket_status:str | None = None #あとでenumに修正
    expense:int | None = None