from pydantic import BaseModel, EmailStr, constr
from uuid import UUID
from datetime import datetime
from typing import Optional

class LivestockCreateRequest(BaseModel):
    tag: constr(min_length=1)
    name: str
    category: str
    breed: str
    age: int
    healthStatus: str

    heatStatus: Optional[bool] = False
    pregnant: Optional[bool] = False
    lastInsemination: Optional[datetime] = None
    inseminationType: Optional[str] = None

    birthDate: Optional[datetime] = None
    motherTag: Optional[str] = None
    fatherTag: Optional[str] = None

    class Config:
        from_attributes = True
    