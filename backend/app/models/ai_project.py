from sqlalchemy import Integer, String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class AIProject(Base):
    __tablename__ = "ai_projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    prompt: Mapped[str] = mapped_column(String(500), nullable=False)
    original_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    generated_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    tech_pack_json: Mapped[str | None] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship(back_populates="ai_projects")
