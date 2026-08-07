from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Pest
from schemas import PestCreate

router = APIRouter(
    prefix="/pests",
    tags=["Pests"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_pest(pest: PestCreate, db: Session = Depends(get_db)):
    new_pest = Pest(
        name=pest.name,
        symptoms=pest.symptoms,
        treatment=pest.treatment
    )

    db.add(new_pest)
    db.commit()
    db.refresh(new_pest)

    return {
        "message": "Pest added successfully",
        "pest": new_pest
    }

@router.get("/")
def get_pests(db: Session = Depends(get_db)):
    pests = db.query(Pest).all()
    return pests

@router.put("/{pest_id}")
def update_pest(pest_id: int, pest: PestCreate, db: Session = Depends(get_db)):
    existing_pest = db.query(Pest).filter(Pest.id == pest_id).first()

    if not existing_pest:
        return {"message": "Pest not found"}

    existing_pest.name = pest.name
    existing_pest.symptoms = pest.symptoms
    existing_pest.treatment = pest.treatment

    db.commit()
    db.refresh(existing_pest)

    return {
        "message": "Pest updated successfully",
        "pest": existing_pest
    }

@router.delete("/{pest_id}")
def delete_pest(pest_id: int, db: Session = Depends(get_db)):
    pest = db.query(Pest).filter(Pest.id == pest_id).first()

    if not pest:
        return {"message": "Pest not found"}

    db.delete(pest)
    db.commit()

    return {
        "message": "Pest deleted successfully"
    }