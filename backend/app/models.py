import uuid
from datetime import date
from enum import Enum

from sqlmodel import Field,SQLModel,Relationship

class TicketStatus(str,Enum):
    ON_APPLICATION = '申込中'
    PURCHASED = '購入済'
    REJECTION = '落選' 

class EventActorLink(SQLModel):
    event_id:uuid.UUID | None = Field(default=None, foreign_key="event.id", primary_key=True)
    actor_id:uuid.UUID | None = Field(default=None, foreign_key="actor.id", primary_key=True)

# EventsテーブルおよびCRUD操作用のベーススキーマ
class EventBase(SQLModel):
    event_name: str = Field(description='ライブイベントのタイトル',examples=['ARABAKI ROCK FEST'])
    venue: str = Field(description='ライブイベントの会場名', examples=['国営みちのく杜の湖畔公園'])
    date: date
    ticket_status: TicketStatus | None = Field(default=None)

# GET イベント取得(出力用)
class EventPublic(EventBase):
    id: uuid.UUID

# POST ライブイベント登録(入力用)
class EventCreate(EventBase):
    pass

# PUT ライブイベント更新(修正)
class EventUpdate(EventBase):
    event_name: str | None = Field(default=None)
    venue: str | None = Field(default=None)
    date: date | None = Field(default=None)

# Eventテーブルのモデル定義
class Event(EventBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    event_name: str = Field(nullable=False, max_length=255)
    venue: str = Field(nullable=False, max_length=255)
    expense_id : uuid.UUID | None = Field(foreign_key="expenses.id", ondelete="CASCADE")
    
    expense: list["Expense"]= Relationship(back_populates="events")
    actors: list["Actor"] = Relationship(back_populates="events", link_model=EventActorLink)
    
# ActorsテーブルおよびCRUD操作用のベーススキーマ
class ActorBase(SQLModel):
    name: str
    favorite: bool = Field(default=False)

# GET アーティスト情報取得(出力用)
class ActorsPublic(ActorBase):
    id: uuid.UUID

# POST アーティスト登録(入力用)
class ActorsCreate(ActorBase):
    pass

# PUT 更新用
class ActorsUpdate(ActorBase):
    name: str | None = Field(default=None)

# Actorテーブルのモデル定義
class Actor(ActorBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(nullable=False, max_length=255)
    
    events: list["Event"] = Relationship(back_populates="actor", link_model=EventActorLink)

# ExpenseテーブルおよびCRUDのモデル
class ExpenseBase(SQLModel):
    category: str
    item_name: str
    amount: int
    
# GET 取得（出力用）
class ExpensePublic(ExpenseBase):
    id: uuid.UUID 
    event_id: uuid.UUID

# POST 作成（入力用）
class ExpenseCreate(ExpenseBase):
    pass

# PUT 更新用
class ExpenseUpdate(ExpenseBase):
    category: str | None
    item_name: str | None
    amount: int | None

# Expenseテーブルのモデル定義
class Expense(ExpenseBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    event_id: uuid.UUID | None = Field(default=None, foreign_key="events.id")