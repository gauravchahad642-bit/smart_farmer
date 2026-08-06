from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.schemas import CropCreate
from backend.database import SessionLocal
from backend.models import Crop

router = APIRouter(
    prefix="/crops",
    tags=["Crops"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_crop(
    crop: CropCreate,
    db: Session = Depends(get_db)
):
    new_crop = Crop(
        name=crop.name,
        season=crop.season,
        soil_type=crop.soil_type
    )

    db.add(new_crop)
    db.commit()
    db.refresh(new_crop)

    return {
        "message": "Crop added successfully",
        "crop": new_crop
    }


@router.get("/")
def get_crops(
    db: Session = Depends(get_db)
):
    crops = db.query(Crop).all()
    return crops


@router.get("/{crop_id}")
def get_crop(
    crop_id: int,
    db: Session = Depends(get_db)
):
    crop = db.query(Crop).filter(Crop.id == crop_id).first()

    if not crop:
        raise HTTPException(
            status_code=404,
            detail="Crop not found"
        )

    return crop


@router.put("/{crop_id}")
def update_crop(
    crop_id: int,
    crop: CropCreate,
    db: Session = Depends(get_db)
):
    existing_crop = db.query(Crop).filter(Crop.id == crop_id).first()

    if not existing_crop:
        raise HTTPException(
            status_code=404,
            detail="Crop not found"
        )

    existing_crop.name = crop.name
    existing_crop.season = crop.season
    existing_crop.soil_type = crop.soil_type

    db.commit()
    db.refresh(existing_crop)

    return {
        "message": "Crop updated successfully",
        "crop": existing_crop
    }


@router.delete("/{crop_id}")
def delete_crop(
    crop_id: int,
    db: Session = Depends(get_db)
):
    existing_crop = db.query(Crop).filter(Crop.id == crop_id).first()

    if not existing_crop:
        raise HTTPException(
            status_code=404,
            detail="Crop not found"
        )

    db.delete(existing_crop)
    db.commit()

    return {
        "message": "Crop deleted successfully"
    }