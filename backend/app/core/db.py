from sqlmodel import create_engine, Session, SQLModel
from core.config import DATABASE_URL

engine = create_engine(DATABASE_URL)


