import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.models import AIProject, Order, User
from app.api.endpoints.users import router as users_router
from app.api.endpoints.orders import router as orders_router
from app.api.endpoints.ai import router as ai_router

logger = logging.getLogger(__name__)

try:
    Base.metadata.create_all(bind=engine)
except Exception as exc:
    logger.warning("Database initialization skipped: %s", exc)

app = FastAPI(title="Appcycling API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(orders_router)
app.include_router(ai_router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "appcycling"}
