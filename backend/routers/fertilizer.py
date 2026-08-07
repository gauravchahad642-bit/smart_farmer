from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Fertilizer
from schemas import FertilizerCreate

router = APIRouter(
    prefix="/fertilizers",
    tags=["Fertilizers"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_fertilizer(
    fertilizer: FertilizerCreate,
    db: Session = Depends(get_db)
):
    new_fertilizer = Fertilizer(
        name=fertilizer.name,
        description=fertilizer.description,
        usage=fertilizer.usage
    )

    db.add(new_fertilizer)
    db.commit()
    db.refresh(new_fertilizer)

    return {
        "message": "Fertilizer added successfully",
        "fertilizer": new_fertilizer
    }


@router.get("/")
def get_fertilizers(
    db: Session = Depends(get_db)
):
    fertilizers = db.query(Fertilizer).all()
    return fertilizers


@router.get("/{fertilizer_id}")
def get_fertilizer(
    fertilizer_id: int,
    db: Session = Depends(get_db)
):
    fertilizer = db.query(Fertilizer).filter(
        Fertilizer.id == fertilizer_id
    ).first()

    if not fertilizer:
        raise HTTPException(
            status_code=404,
            detail="Fertilizer not found"
        )

    return fertilizer


@router.put("/{fertilizer_id}")
def update_fertilizer(
    fertilizer_id: int,
    fertilizer: FertilizerCreate,
    db: Session = Depends(get_db)
):
    existing_fertilizer = db.query(Fertilizer).filter(
        Fertilizer.id == fertilizer_id
    ).first()

    if not existing_fertilizer:
        raise HTTPException(
            status_code=404,
            detail="Fertilizer not found"
        )

    existing_fertilizer.name = fertilizer.name
    existing_fertilizer.description = fertilizer.description
    existing_fertilizer.usage = fertilizer.usage

    db.commit()
    db.refresh(existing_fertilizer)

    return {
        "message": "Fertilizer updated successfully",
        "fertilizer": existing_fertilizer
    }


@router.delete("/{fertilizer_id}")
def delete_fertilizer(
    fertilizer_id: int,
    db: Session = Depends(get_db)
):
    existing_fertilizer = db.query(Fertilizer).filter(
        Fertilizer.id == fertilizer_id
    ).first()

    if not existing_fertilizer:
        raise HTTPException(
            status_code=404,
            detail="Fertilizer not found"
        )

    db.delete(existing_fertilizer)
    db.commit()

    return {
        "message": "Fertilizer deleted successfully"
    }