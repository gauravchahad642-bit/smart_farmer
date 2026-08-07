from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)


class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    season = Column(String, nullable=False)
    soil_type = Column(String, nullable=False)


class Fertilizer(Base):
    __tablename__ = "fertilizers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    usage = Column(String)


class Pest(Base):
    __tablename__ = "pests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    symptoms = Column(String)
    treatment = Column(String)


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String, nullable=False)
    fertilizer_name = Column(String, nullable=False)
    pesticide_name = Column(String, nullable=False)
    season = Column(String, nullable=False)
    soil_type = Column(String, nullable=False)