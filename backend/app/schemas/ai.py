from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class AIGenerationRequest(BaseModel):
    prompt: str = Field(..., min_length=3)
    image_url: Optional[str] = None


class AIGenerationResponse(BaseModel):
    generated_ideas: List[str]


class TechPackRequest(BaseModel):
    design_id: int
    style: str = Field(..., min_length=2)
    fabric: str = Field(..., min_length=2)


class TechPackResponse(BaseModel):
    design_id: int
    style: str
    fabric: str
    bom: List[Dict[str, Any]]
    pattern_layout: Dict[str, Any]
