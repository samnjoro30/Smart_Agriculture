from pydantic import BaseModel, EmailStr, constr

class ChangeEmail(BaseModel):
    email: EmailStr

class ChangeFarmname(BaseModel):
    farmname: str

class ChangePhonenumber(BaseModel):
    phonenumber: constr(min_length=10, max_length=15)
    
class ChangePassword(BaseModel):
    password: constr(min_length=6)