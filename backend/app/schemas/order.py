from typing import Optional
from pydantic import BaseModel, Field


class OrderCreate(BaseModel):
    user_id: int
    design_id: int
    price: float = Field(..., ge=0)
    delivery_address: str = Field(..., min_length=3, max_length=300)


class OrderStatusUpdate(BaseModel):
    status: str


class OrderOut(BaseModel):
    id: int
    user_id: int
    design_id: int
    price: float
    status: str
    delivery_address: str
