from pydantic import BaseModel, EmailStr
from typing import Optional


class NotificationPayload(BaseModel):
    to: str                    # phone | email | push token
    title: Optional[str] = None
    message: str