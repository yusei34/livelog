import uuid
from typing import Any
from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select
from ..deps import SessionDep
from models.models import Expense, ExpenseCreate, ExpensePublic, ExpenseUpdate, ExpenseInEvent, Message 

router = APIRouter(prefix='/expenses', tags=['expense'])

@router.post('/', response_model=ExpensePublic)
def create_expense(session: SessionDep, expense: ExpenseCreate) ->Any:
    db_expense = Expense.model_validate(expense)
    session.add(db_expense)
    session.commit()
    session.refresh(db_expense)
    return db_expense

@router.get('/', response_model=list[ExpensePublic])
def read_expenses(session: SessionDep, offset: int = 0, limit: int = Query(default=20, le=100)):
    expense = session.exec(select(Expense).offset(offset).limit(limit)).all()
    return expense

@router.get('/{expense_id}', response_model=ExpenseInEvent)
def read_expense(session: SessionDep, expense_id: uuid.UUID) ->Any:
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail='Expense Not Found')
    return expense

@router.put('/{expense_id}', response_model=ExpensePublic)
def update_expense(session: SessionDep, expense_id: uuid.UUID, expense: ExpenseUpdate) ->Any:
    db_expense = session.get(Expense, expense_id)
    if not db_expense:
        raise HTTPException(status_code=404, detail='Expense Not Found')
    update_data = expense.model_dump(exclude_unset=True)
    db_expense.sqlmodel_update(update_data)
    session.add(db_expense)
    session.commit()
    session.refresh(db_expense)
    return db_expense

@router.delete('/{expense_id}', response_model=Message)
def delete_expense(session: SessionDep, expense_id: uuid.UUID) ->Any:
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail='Expense Not Found ')
    session.delete(expense)
    session.commit()
    return Message(message='Expense deleted successfully')
    