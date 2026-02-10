from pydantic import BaseModel, EmailStr, constr


class RegisterRequest(BaseModel):
    username: constr(min_length=3)
    email: EmailStr
    farmname: str
    phonenumber: constr(min_length=10, max_length=15)
    password: constr(min_length=6)


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class RegisterSubscribers(BaseModel):
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=6)


class codeResend(BaseModel):
    email: EmailStr


class ResetPassword(BaseModel):
    email: EmailStr
    newPassword: constr(min_length=6)


class adminRegisterRequest(BaseModel):
    username: constr(min_length=3)
    email: EmailStr
    password: constr(min_length=6)
    role: constr(min_length=3)


class adminLoginRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=6)
