import uuid
from sqlmodel import Field, Relationship, SQLModel

class ExpenseBase(SQLModel):
    category: str
    item_name: str
    amount: int
    
class ExpensePublic(ExpenseBase):
    id: uuid.UUID 
    # event_id: uuid.UUID

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    category: str | None  = None
    item_name: str | None = None
    amount: int | None = None
    
class Expense(ExpenseBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # event_id: uuid.UUID | None = Field(default=None, foreign_key="event.id")