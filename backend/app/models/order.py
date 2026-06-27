from sqlalchemy import Integer, Numeric, ForeignKey, Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
import enum


class OrderStatus(str, enum.Enum):
    New = "New"
    In_Progress = "In_Progress"
    Ready = "Ready"
    Delivered = "Delivered"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    design_id: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus), nullable=False, default=OrderStatus.New)
    delivery_address: Mapped[str] = mapped_column(String(300), nullable=False, default="")

    user: Mapped["User"] = relationship(back_populates="orders")
