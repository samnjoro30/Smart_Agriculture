# main.py or a separate create_tables.py script
from db.postgre_db import engine
from model.tables import Base  # where your Users class is

def create_tables():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
