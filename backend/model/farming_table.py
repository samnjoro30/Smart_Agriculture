from db.postgre_db import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime


class FarmingInput(Base):
    __tablename__ = "cows"

    id = Column(Integer, primary_key=True, index=True)
    cowname = Column(String(255))
    cowage = Column(Integer(200))
    cowlastBirth = Column(DateTime, nullable=True)
    lastMate = Column(DateTime, nullable=True)
    calf = Column(Integer)

class GoatFarming(Base):
    __tablename__ = "Goats"

    id = Column(Integer, primary_key=True, index=True)
    Goatname = Column(String(255))
    Goatage = Column(Integer(200))
    GoatlastBirth = Column(DateTime, nullable=True)
    lastMate = Column(DateTime, nullable=True)
    calf = Column(Integer)