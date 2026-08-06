from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Recommendation
from backend.schemas import RecommendationCreate


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_recommendation(
    recommendation: RecommendationCreate,
    db: Session = Depends(get_db)
):
    new_recommendation = Recommendation(
    crop_name=recommendation.crop_name,
    fertilizer_name=recommendation.fertilizer_name,
    pesticide_name=recommendation.pesticide_name,
    soil_type=recommendation.soil_type,
    season=recommendation.season
)

    db.add(new_recommendation)
    db.commit()
    db.refresh(new_recommendation)

    return {
        "message": "Recommendation added successfully",
        "recommendation": new_recommendation
    }


@router.get("/")
def get_recommendations(
    db: Session = Depends(get_db)
):
    return db.query(Recommendation).all()
@router.get("/ai")
def ai_recommendation(
    soil_type: str,
    season: str,
    db: Session = Depends(get_db)
):
    recommendation = db.query(Recommendation).filter(
        Recommendation.soil_type == soil_type,
        Recommendation.season == season
    ).first()

    if recommendation:
        return recommendation

    return {
        "message": "No recommendation found"
    }