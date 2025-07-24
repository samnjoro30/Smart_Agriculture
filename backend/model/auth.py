from pydantic import BaseModel, EmailStr, constr

class RegisterRequest(BaseModel):
    username: constr(min_length=3)
    email: EmailStr
    farmname: str
    phonenumber: constr(min_length=10, max_length=15)
    password: constr(min_length=6)
    confirmpassword: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str