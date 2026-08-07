from pydantic import BaseModel, Field, EmailStr


class CropCreate(BaseModel):
    name: str = Field(..., min_length=2)
    season: str = Field(..., min_length=2)
    soil_type: str = Field(..., min_length=2)


class FertilizerCreate(BaseModel):
    name: str = Field(..., min_length=2)
    description: str = Field(..., min_length=5)
    usage: str = Field(..., min_length=5)
    quantity: int = Field(..., gt=0)


class PestCreate(BaseModel):
    name: str = Field(..., min_length=2)
    symptoms: str = Field(..., min_length=5)
    treatment: str = Field(..., min_length=5)


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class RecommendationCreate(BaseModel):
    crop_name: str = Field(..., min_length=2)
    fertilizer_name: str = Field(..., min_length=2)
    pesticide_name: str = Field(..., min_length=2)
    season: str = Field(..., min_length=2)
    soil_type: str = Field(..., min_length=2)