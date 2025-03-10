import uuid
from datetime import date
from enum import Enum
from typing import Optional
from sqlmodel import Field,SQLModel,Relationship









# class TicketStatus(str,Enum):
#     ON_APPLICATION = '申込中'
#     PURCHASED = '購入済'
#     REJECTION = '落選' 



# class EventBase(SQLModel):
#     event_name: str = Field(description= 'ライブイベントのタイトル')
#     venue: str = Field(description= 'ライブイベントの会場名')
#     date: date
#     ticket_status: str

# class EventPublic(EventBase):
#     id: uuid.UUID

# class EventCreate(EventBase):
#     pass

# class EventUpdate(EventBase):
#     event_name: "Optional[str]" = Field(default= None)
#     venue: "Optional[str]" = Field(default= None)
#     date: "Optional[date]" = Field(default= None) 

# class Event(EventBase, table=True):
#     id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
#     event_name: str = Field(nullable=False, max_length=255)
#     venue: str = Field(nullable=False, max_length=255)
#     expense_id : Optional[uuid.UUID] = Field(foreign_key="expense.id")
    
#     expense: list["Expense"]= Relationship(back_populates= "events")
#     actors: list["Actor"] = Relationship(back_populates= "events", link_model= EventActorLink)
    
# # ActorsテーブルおよびCRUD操作用のベーススキーマ
# class ActorBase(SQLModel):
#     name: str
#     favorite: bool = Field(default= False)

# # GET アーティスト情報取得(出力用)
# class ActorsPublic(ActorBase):
#     id: uuid.UUID

# # POST アーティスト登録(入力用)
# class ActorsCreate(ActorBase):
#     pass

# # PUT 更新用
# class ActorsUpdate(ActorBase):
#     name: Optional[str] = Field(default=None)

# # Actorテーブルのモデル定義
# class Actor(ActorBase, table=True):
#     id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
#     name: str = Field(nullable=False, max_length=255)
    
#     events: list["Event"] = Relationship(back_populates="actors", link_model=EventActorLink)



