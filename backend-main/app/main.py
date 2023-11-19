from fastapi import FastAPI,Depends,status,Response,HTTPException
from . import schemas,models,hashing,database
from .database import engine,SessionLocal,get_db
from sqlalchemy.orm import Session

from typing import List
from passlib.context import CryptContext
from .routers import story,user,poem

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins=[
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

models.Base.metadata.create_all(engine)

app.include_router(story.router)
app.include_router(user.router)
app.include_router(poem.router)
  
