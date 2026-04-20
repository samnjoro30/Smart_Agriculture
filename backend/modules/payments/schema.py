from pydantic import BaseModel, EmailStr, constr
from uuid import UUID
from datetime import datetime
from typing import Optional

class STKPushRequest(BaseModel):
    amount: float
    phone_number: constr(min_length=10, max_length=15)