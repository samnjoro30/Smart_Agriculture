import africastalking
from config.setting import get_settings
from config.audit.logger import get_logger  
from modules.notifications.schemas import NotificationPayload

settings = get_settings()

logger = get_logger("sms_provider")


africastalking.initialize(
    settings.AFRICASTALKING_USERNAME, 
    settings.AFRICASTALKING_API_KEY,
)

sms = africastalking.SMS

def format_phone_number(phone: str) -> str:
    if phone.startwith("07"):
        return "+254" + phone[1:]
    if phone.startwith("7") and len(phone) == 9:
        return "+254" + phone
    return phone

async def send_sms(payload: NotificationPayload) -> bool:
    try:
        formatted = format_phone_number(payload.to)
        response = sms.send(payload.message, [formatted])
        logger.info(f"SMS sent to {formatted}: {response}")
        return True
    except Exception as e:
        logger.error(f"Failed to send SMS to {payload.to}: {str(e)}")
        return False