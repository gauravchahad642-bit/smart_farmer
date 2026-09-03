from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Recommendation
from schemas import RecommendationCreate


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
    season: str
):
    recommendations = {
        ("Black Soil", "Kharif"): {
            "crop_name": "Cotton",
            "fertilizer_name": "Urea",
            "pesticide_name": "Neem Oil"
        },
        ("Black Soil", "Rabi"): {
            "crop_name": "Wheat",
            "fertilizer_name": "DAP",
            "pesticide_name": "Neem Oil"
        },
        ("Red Soil", "Kharif"): {
            "crop_name": "Groundnut",
            "fertilizer_name": "NPK",
            "pesticide_name": "Neem Oil"
        },
        ("Red Soil", "Rabi"): {
            "crop_name": "Gram",
            "fertilizer_name": "DAP",
            "pesticide_name": "Neem Oil"
        },
        ("Alluvial Soil", "Kharif"): {
            "crop_name": "Rice",
            "fertilizer_name": "Urea",
            "pesticide_name": "Neem Oil"
        },
        ("Alluvial Soil", "Rabi"): {
            "crop_name": "Wheat",
            "fertilizer_name": "DAP",
            "pesticide_name": "Neem Oil"
        },
        ("Sandy Soil", "Zaid"): {
            "crop_name": "Watermelon",
            "fertilizer_name": "NPK",
            "pesticide_name": "Neem Oil"
        },
        ("Loamy", "Kharif"): {
            "crop_name": "Maize",
            "fertilizer_name": "NPK",
            "pesticide_name": "Neem Oil"
        },
        ("Clay", "Kharif"): {
            "crop_name": "Rice",
            "fertilizer_name": "Urea",
            "pesticide_name": "Neem Oil"
        }
    }

    result = recommendations.get((soil_type, season))

    if result:
        return result

    return {
        "message": "No recommendation available for this soil and season"
    }