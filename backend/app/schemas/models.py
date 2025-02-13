import uuid
from datetime import date
from enum import Enum

from sqlmodel import Field,SQLModel,Relationship

class TicketStatus(str,Enum):
    ON_APPLICATION = '申込中'
    PURCHASED = '購入済'
    REJECTION = '落選' 

# EventsテーブルおよびCRUD操作用のベーススキーマ
class EventsBase(SQLModel):
    event_name:str = Field(description='ライブイベントのタイトル',examples=['ARABAKI ROCK FEST'])
    venue:str = Field(description='ライブイベントの会場名', examples=['国営みちのく杜の湖畔公園'])
    date:date
    ticket_status:TicketStatus | None = Field(default=None)

# GET イベント取得(出力用)
class EventsPublic(EventsBase):
    id: uuid.UUID

# POST ライブイベント登録(入力用)
class EventsCreate(EventsBase):
    pass

# PUT ライブイベント更新(修正)
class EventsUpdate(EventsBase):
    event_name: str | None
    venue: str | None
    date: date | None

# Eventsテーブルのモデル定義
class Events(EventsBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    event_name: str = Field(nullable=False, max_length=255)
    venue: str = Field(nullable=False, max_length=255)
    expense_id : uuid.UUID | None = Field(foreign_key="expenses.id", ondelete="CASCADE")
    expenses: Expenses | None = Relationship(back_populates="events")
    actors: EventActor | None = Relationship(back_populates="events")