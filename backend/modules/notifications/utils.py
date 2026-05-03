def get_recipient(user, channel: str) -> str | None:
    if channel == "sms":
        return user.phone
    elif channel == "email":
        return user.email
    elif channel == "push":
        return user.device_token  # if you have it
    return None
