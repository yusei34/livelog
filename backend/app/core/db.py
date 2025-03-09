from sqlmodel import create_engine, Session, SQLModel

from app.core.config import DATABASE_URL

# PostgreSQL用のエンジンを作成, DATABASE_URLはconfig.pyからインポート
# engine = create_engine(DATABASE_URL)
engine = create_engine(DATABASE_URL)

def create_db_tables():
    # Alembicを使ったマイグレーションでのテーブル作成に後ほど修正予定
    # 現時点ではcreate_all()を使ったシンプルな実装
    SQLModel.metadata.create_all(engine)

