from .sms import send_sms
from .email import send_email
from .push import send_push

CHANNEL_MAP = {
    "sms": send_sms,
    "email": send_email,
    "push": send_push,
}
