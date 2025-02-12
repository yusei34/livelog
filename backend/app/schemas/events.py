import uuid
from datetime import date
from enum import Enum

from sqlmodel import Field,SQLModel

class TicketStatus(str,Enum):
    ON_APPLICATION = '申込中'
    PURCHASED = '購入済'
    REJECTION = '落選' 

# EventsテーブルおよびCRUD操作用のベーススキーマ
class EventBase(SQLModel):
    event_name:str = Field(description='ライブイベントのタイトル',examples=['ARABAKI ROCK FEST'])
    venue:str = Field(description='ライブイベントの会場名', examples=['国営みちのく杜の湖畔公園'])
    date:date
    ticket_status:TicketStatus | None = Field(default=None)
    # ベースからは除外
    # expense:int | None = None

# POST ライブイベント登録
class EventsCreate(EventBase):
    pass

# PUT ライブイベント更新(修正)
class EventsUpdate(EventBase):
    event_name: str | None
    venue: str | None
    date: date | None
    ticket_status: TicketStatus | None
    
# Eventsテーブルのモデル定義
class Event(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    