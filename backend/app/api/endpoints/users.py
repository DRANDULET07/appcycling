from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User
from app.schemas.user import EcoImpactOut, UserCreate, UserOut, EcoPointsUpdate


class B2BLeadRequest(BaseModel):
    inn: str
    quantity: int
    contacts: str


class B2BLeadResponse(BaseModel):
    message: str
    received: bool
    data: dict

router = APIRouter(prefix="/users", tags=["users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    db_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        eco_points=120,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=UserOut)
def login_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/me/eco-impact", response_model=EcoImpactOut)
def get_eco_impact(db: Session = Depends(get_db)):
    user = db.query(User).order_by(User.id.desc()).first()
    if not user:
        user = User(name="Demo User", email="demo@appcycling.com", role="b2c", eco_points=120)
        db.add(user)
        db.commit()
        db.refresh(user)

    return EcoImpactOut(
        saved_textile_kg=min(142, 120 + user.eco_points // 5),
        saved_water_l=min(540, 300 + user.eco_points * 3),
        current_level="Эко-новичок" if user.eco_points < 300 else "Эко-гуру",
        next_level="Эко-гуру" if user.eco_points < 300 else "Максимум",
        progress_percent=min(100, user.eco_points // 3),
    )


@router.post("/b2b/leads", response_model=B2BLeadResponse)
def submit_b2b_lead(payload: B2BLeadRequest):
    return B2BLeadResponse(
        message="Lead received",
        received=True,
        data={
            "inn": payload.inn,
            "quantity": payload.quantity,
            "contacts": payload.contacts,
        },
    )


@router.patch("/{user_id}/eco-points", response_model=UserOut)
def update_eco_points(user_id: int, payload: EcoPointsUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.eco_points = payload.eco_points
    db.commit()
    db.refresh(user)
    return user
