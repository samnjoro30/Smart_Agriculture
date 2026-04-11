


async def filter_channels(preferences, channels: list[str]) -> list[str]:
    if not preferences:
        return ["email"]  # fallback: allow all

    allowed = []

    if "email" in channels and preferences.email_enabled:
        allowed.append("email")

    if "sms" in channels and preferences.sms_enabled:
        allowed.append("sms")

    if "push" in channels and preferences.push_enabled:
        allowed.append("push")

    if "whatsapp" in channels and preferences.whatsapp_enabled:
        allowed.append("whatsapp")

    return allowed