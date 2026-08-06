from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database import Base, engine
from backend import models

from backend.routers import crop
from backend.routers import fertilizer
from backend.routers import pest
from backend.routers import user
from backend.routers import recommendation

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Farmer API",
    description="Crop, Fertilizer and Pest Management System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crop.router)
app.include_router(fertilizer.router)
app.include_router(pest.router)
app.include_router(user.router)
app.include_router(recommendation.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Smart Farmer System"
    }