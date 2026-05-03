from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List, Optional
from decimal import Decimal


class FinancialReportItem(BaseModel):
    date: datetime
    category: str
    description: str
    type: str  # INCOME or EXPENSE
    amount: Decimal


class FinancialReportResponse(BaseModel):
    # report_id: Optional[UUID] = None
    farm_name: str
    start_date: datetime
    end_date: datetime
    total_income: Decimal
    total_expense: Decimal
    net_profit: Decimal
    transactions: List[FinancialReportItem]

    class Config:
        from_attributes = True


class ReportCreateSchema(BaseModel):
    report_type: str  # e.g., "FINANCIAL", "MILK", "HEALTH"
    start_date: datetime
    end_date: datetime


class ReportReadSchema(BaseModel):
    id: UUID
    status: str
    report_type: str
    created_at: datetime

    class Config:
        from_attributes = True
