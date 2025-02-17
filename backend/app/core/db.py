from sqlmodel import create_engine, Session, SQLModel
from typing import Annotated
from fastapi import Depends
from app.core.config import DATABASE_URL

# PostgreSQL用のエンジンを作成, DATABASE_URLはconfig.pyからインポート
# engine = create_engine(DATABASE_URL)
engine = create_engine("postgresql://matsurayusei:yuma0304@localhost/livelog")

def create_db_tables():
    # Alembicを使ったマイグレーションでのテーブル作成に後ほど修正予定
    # 現時点ではcreate_all()を使ったシンプルな実装
    SQLModel.metadata.create_all(engine)

def get_session():
    # セッションを生成し、withブロックで管理することで、リクエスト後に自動的にクローズする
    with Session(engine) as session:
        yield session

# Annotatedを使って依存関係を簡単に指定するためのエイリアス
SessionDep = Annotated[Session, Depends(get_session)]