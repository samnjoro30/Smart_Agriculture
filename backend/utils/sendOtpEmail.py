import os
from email.message import EmailMessage

from aiosmtplib import send
from dotenv import load_dotenv

from services.auth import retrieve_otp

load_dotenv()

USER_EMAIL = os.getenv("USER_EMAIL")
USER_PASSWORD = os.getenv("USER_PASSWORD")
HOST = os.getenv("SMTP_HOST")
PORT = os.getenv("SMTP_PORT")


async def sendOTP(email: str, otp: retrieve_otp, username: str):
    message = EmailMessage()
    message["from"] = USER_EMAIL
    message["To"] = email
    message["subjet"] = "Smart Agriculture Verification Code"
    message.set_content(
        f"""
       Hello {username}

       Your Verfication Code is {otp}
       IT expires in 10 minutes

       best regards
       smart Agriculture team
    """
    )
    try:
        await send(
            message,
            hostname=HOST,
            port=PORT,
            start_tls=True,
            username=USER_EMAIL,
            password=USER_PASSWORD,
        )
    except Exception as e:
        print(f"failed to send email {e}")
