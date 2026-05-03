import africastalking
from config.setting import get_settings
from config.audit.logger import get_logger
from modules.notifications.schemas import NotificationPayload

settings = get_settings()
logger = get_logger("sms_provider")

sms_client = None


def init_sms():
    global sms_client

    if sms_client is not None:
        return sms_client

    africastalking.initialize(
        settings.AFRICASTALKING_USERNAME,
        settings.AFRICASTALKING_API_KEY,
    )

    sms_client = africastalking.SMS
    return sms_client


def format_phone_number(phone: str) -> str:
    phone = phone.strip()

    if phone.startswith("07") and len(phone) == 10:
        return "+254" + phone[1:]

    if phone.startswith("7") and len(phone) == 9:
        return "+254" + phone

    if phone.startswith("+"):
        return phone

    return phone  # fallback (or raise error later)


async def send_sms(payload: NotificationPayload) -> bool:
    try:
        sms = init_sms()

        formatted = format_phone_number(payload.to)

        response = sms.send(payload.message, [formatted])

        logger.info(f"SMS sent to {formatted}: {response}")
        return True

    except Exception as e:
        logger.error(f"Failed to send SMS to {payload.to}: {str(e)}")
        return False
