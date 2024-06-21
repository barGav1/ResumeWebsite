from fastapi import FastAPI, HTTPException, Depends, Request, Response,Path
from typing import List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
import uuid  # Import UUID module for generating unique session IDs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str

class UserModel(User):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

@app.post("/users/", response_model=UserModel)
async def create_user(user: User, db: Session = Depends(get_db)):
    existing_user = db.query(models.Users).filter(models.Users.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="User already exists")
    db_user = models.Users(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserModel])
async def read_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    users = db.query(models.Users).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserModel)
async def read_user(user_id: int = Path(..., title="The ID of the user to retrieve"), db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/login/")
async def login_user(user: User, response: Response, db: Session = Depends(get_db)):
    existing_user = db.query(models.Users).filter(models.Users.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    if existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a unique session ID
    session_id = str(uuid.uuid4())
    
    # Save the user ID in the session
    response.set_cookie(key="session_id", value=session_id)
    response.set_cookie(key="user_id", value=str(existing_user.id))

    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "email": existing_user.email
        }
    }

@app.post("/logout/")
async def logout_user(response: Response, request: Request):
    # Clear the session by removing the session cookie
    response.delete_cookie("session_id")
    response.delete_cookie("user_id")
    return {"message": "Logged out"}
