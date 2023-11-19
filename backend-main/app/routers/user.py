from fastapi import APIRouter,Depends,status,HTTPException
from .. import schemas,models,database,hashing
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext
from ..hashing import Hash
from dotenv import load_dotenv
import os
router = APIRouter(
    prefix='/user',
    tags=['users']
)
load_dotenv()
# Create an instance of the password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post('/create/',response_model=schemas.ShowUser,)
def create_user(request: schemas.User,db:Session=Depends(database.get_db)):
    new_user=models.User(name=request.name,username=request.username,email=request.email,password=hashing.Hash.bcrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user 

@router.get('/{username}/',response_model=schemas.ShowUser,)
def get_user(username:str,db:Session=Depends(database.get_db)):
    user=db.query(models.User).filter(models.User.username==username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'User with id {id} not found')
    else:
        return user
    
# Function to verify the password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# @router.post('/authenticate/')
# def authenticate_user(username: str, password: str, db: Session = Depends(database.get_db)):
#     user = db.query(models.User).filter(models.User.username == username).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'User with username {username} not found')
    
#     if not verify_password(password, user.password):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect password')

#     return True    

@router.post('/authenticate/')
def authenticate_user(request: schemas.Credentials, db: Session = Depends(database.get_db)):
    # Check if the credential is an email
    user = db.query(models.User).filter(models.User.email == request.credential).first()

    # If the credential is not an email, check if it's a username
    if not user:
        user = db.query(models.User).filter(models.User.username == request.credential).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'User not found')

    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect password')

    #make a file and write current active user
    f=open("active_user.txt","w")
    f.write(user.username)
    f.close()
    return True
