from pydantic import BaseModel, Field, ConfigDict

from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID
from datetime import datetime
from typing import Optional, List


class MilkProductionRecordRequest(BaseModel):
    cow_tag: Optional[str] = Field(None, alias="cowTag")
    liters: float
    pricePerLiter: float = Field(..., alias="pricePerLiter")
    # totalRevenue: float
    session: str

    model_config = ConfigDict(populate_by_name=True)


class MilkRecordResponse(BaseModel):
    id: UUID
    cow_id: Optional[UUID]
    liters: float
    price_per_liter: float
    total_revenue: float
    session: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MilkProductionSummary(BaseModel):
    total_liters: float
    total_revenue: float
    record_count: int
    records: List[MilkRecordResponse]
