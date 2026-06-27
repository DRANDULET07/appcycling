from fastapi import APIRouter
from app.schemas.ai import AIGenerationRequest, AIGenerationResponse, TechPackRequest, TechPackResponse

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/generate", response_model=AIGenerationResponse)
def generate_design(payload: AIGenerationRequest):
    ideas = [
        f"{payload.prompt} — вариант 1",
        f"{payload.prompt} — вариант 2",
        f"{payload.prompt} — вариант 3",
        f"{payload.prompt} — вариант 4",
        f"{payload.prompt} — вариант 5",
    ]
    return {"generated_ideas": ideas}


@router.post("/tech-pack", response_model=TechPackResponse)
def generate_tech_pack(payload: TechPackRequest):
    return TechPackResponse(
        design_id=payload.design_id,
        style=payload.style,
        fabric=payload.fabric,
        bom=[
            {"material": "Denim", "quantity": 2.2, "unit": "m"},
            {"material": "Thread", "quantity": 1, "unit": "roll"},
            {"material": "Buttons", "quantity": 6, "unit": "pcs"},
        ],
        pattern_layout={
            "front": "T-shape",
            "back": "straight",
            "sleeves": "short",
        },
    )
