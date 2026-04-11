import firebase_admin
from firebase_admin import credentials, messaging
from config.setting import get_settings
from config.audit.logger import get_logger
from modules.notifications.schemas import NotificationPayload
import os
settings = get_settings()
logger = get_logger("push_provider")

_firebase_initialized = False


def init_firebase():
    global _firebase_initialized

    if _firebase_initialized:
        return

    cred_path = settings.FIREBASE_CREDENTIALS_PATH

    if not cred_path or not os.path.exists(cred_path):
        raise FileNotFoundError(f"Firebase credentials not found: {cred_path}")

    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

    _firebase_initialized = True


async def send_push(payload: NotificationPayload) -> bool:
    try:
        init_firebase()

        message = messaging.Message(
            notification=messaging.Notification(
                title=payload.title or "Notification",
                body=payload.message,
            ),
            token=payload.to,
        )

        response = messaging.send(message)

        logger.info(f"Push sent: {response}")
        return True

    except Exception as e:
        logger.error(f"Push failed: {str(e)}")
        return False