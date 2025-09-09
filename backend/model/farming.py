from pydantic import BaseModel, EmailStr, constr

class Register_cow(BaseModel):
    cowname = str