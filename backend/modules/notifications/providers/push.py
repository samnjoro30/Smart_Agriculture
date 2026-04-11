import firebase_admin
from firebase_admin import credentials, messaging
from config.setting import get_settings
from config.audit.logger import get_logger
from modules.notifications.schemas import NotificationPayload

settings = get_settings()
logger = get_logger("push_provider")


# Initialize Firebase ONCE
if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)


async def send_push(payload: NotificationPayload) -> bool:
    try:
        message = messaging.Message(
            notification=messaging.Notification(
                title=payload.title or "Notification",
                body=payload.message,
            ),
            token=payload.to,
        )

        response = messaging.send(message)

        logger.info(f"Push sent to {payload.to}: {response}")
        return True

    except Exception as e:
        logger.error(f"Failed to send push to {payload.to}: {str(e)}")
        return False