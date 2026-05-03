from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import List, Dict


class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AdminResponse


class ActivityItem(BaseModel):
    id: str
    name: str
    email: str
    time: str


class DashboardOverviewResponse(BaseModel):
    admin_name: str
    total_farmers: int
    livestock_monitored: int
    active_alerts: int
    revenue: int
    recent_activities: List[ActivityItem]


class ReproStats(BaseModel):
    pregnant: int
    in_heat: int


class SpeciesItem(BaseModel):
    species: str
    count: int


class AdminLivestockStatsResponse(BaseModel):
    total_animals: int
    reproductive_stats: ReproStats
    health_distribution: Dict[str, int]
    species_breakdown: List[SpeciesItem]
    system_health_score: float


class FarmerListResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    farmname: str
    is_verified: bool
    is_active: bool
    joined_at: str


class UpdateStatusSchema(BaseModel):
    is_active: bool


class TransactionItem(BaseModel):
    id: str
    username: str
    amount: float
    category: str
    reference: str
    date: str


class FinanceOverviewResponse(BaseModel):
    total_revenue: float
    currency: str
    transaction_stats: Dict[str, int]
    recent_transactions: List[TransactionItem]
