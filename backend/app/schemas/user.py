from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    role: str = "b2c"


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    eco_points: int


class EcoImpactOut(BaseModel):
    saved_textile_kg: int
    saved_water_l: int
    current_level: str
    next_level: str
    progress_percent: int


class EcoPointsUpdate(BaseModel):
    eco_points: int = Field(..., ge=0)
