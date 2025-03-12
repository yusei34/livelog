from typing import Annotated

from fastapi import Depends, HTTPException
from sqlmodel import Session

from core.db import engine



def get_session():
    # セッションを生成し、withブロックで管理することで、リクエスト後に自動的にクローズする
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]