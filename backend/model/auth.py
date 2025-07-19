from pydantic import BaseModel, EmailStr, constr

class RegisterRequest(BaseModel):
    username: constr(min_length=3)
    email: str
    farmname: str
    phonenumber: str
    password: constr(min_length=6)
    confirmpassword: str
