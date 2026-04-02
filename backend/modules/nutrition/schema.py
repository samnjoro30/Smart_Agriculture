from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class FeedBase(BaseModel):
    name: str
    category: Optional[str] = None
    quantity: Optional[int] = 0
    unit: Optional[str] = None
    costPerUnit: Optional[float] = 0.0
    supplier: Optional[str] = None

class FeedCreate(FeedBase):
    pass

class FeedUpdate(BaseModel):
    name: Optional[str]
    category: Optional[str]
    quantity: Optional[int]
    unit: Optional[str]
    costPerUnit: Optional[float]
    supplier: Optional[str]

class FeedOut(FeedBase):
    id: UUID
    user_id: UUID
    createdAt: datetime

    # class Config:
    #     from_attributes = True  # replaces orm_mode in Pydantic v2