from pydantic import BaseModel


class Register_cow(BaseModel):
    name: str
    age: int
    lastBirth: str
    lastMate: str
    calf: int
