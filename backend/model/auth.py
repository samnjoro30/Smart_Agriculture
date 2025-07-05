from pydantic import BaseModel, EmailStr, constr

class RegisterRequest(BaseModel):
    username: constr(min_length=3)
    email: str
    farmName: str
    phoneNumber: str
    password: constr(min_length=6)
    confirmPassword: str
