from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from config.audit.logger import get_logger
from config.setting import get_settings
from modules.notifications.schemas import NotificationPayload

settings = get_settings()
logger = get_logger("email_provider")

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)

async def send_email(payload: NotificationPayload) -> bool:
    try:
        message = MessageSchema(
            subject=payload.title or "Notification",
            recipients=[payload.to],
            body=payload.message,
            subtype="html"
        )

        fm = FastMail(conf)
        await fm.send_message(message)

        logger.info(f"Email sent to {payload.to}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email to {payload.to}: {str(e)}")
        return False