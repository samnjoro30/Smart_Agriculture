import aiosmtplib
from email.message import EmailMessage
from config.audit.logger import get_logger
from config.setting import get_settings
from modules.notifications.schemas import NotificationPayload

settings = get_settings()
logger = get_logger("email_provider")


async def send_email(payload: NotificationPayload) -> bool:
    try:
        msg = EmailMessage()
        msg["From"] = settings.MAIL_FROM
        msg["To"] = payload.to
        msg["Subject"] = payload.title or "Notification"
        msg.set_content(payload.message)

        await aiosmtplib.send(
            msg,
            hostname=settings.MAIL_SERVER,
            port=settings.MAIL_PORT,
            username=settings.MAIL_USERNAME,
            password=settings.MAIL_PASSWORD,
            start_tls=True,
        )

        logger.info(f"Email sent to {payload.to}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email to {payload.to}: {str(e)}")
        return False
