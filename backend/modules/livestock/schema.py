from pydantic import BaseModel, EmailStr, constr
from uuid import UUID
from datetime import datetime

class LivestockCreateRequest(BaseModel):
    tag: constr(min_length=1)
    name: str
    category: str
    breed: str
    heatStatus: bool = False
    pregnant: bool = False
    lastInsemination: datetime | None = None
    age: int
    healthStatus: str
    