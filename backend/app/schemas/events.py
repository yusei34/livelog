import uuid
from datetime import date
from enum import Enum

from sqlmodel import Field,SQLModel,Relationship

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
class Events(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    event_name: str = Field(nullable=False, max_length=200)
    venue: str = Field(nullable=False, max_length=200)
    expense_id : uuid.UUID | None = Field(foreign_key="expenses.id")
    expenses: Expenses | None = Relationship(back_populates="events")
    