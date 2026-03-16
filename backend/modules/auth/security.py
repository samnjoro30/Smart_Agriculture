def normalize_phone(phone: str):
    phone = phone.replace(" ", "").replace("-", "")
    if phone.startswith("+"):
        return phone
    elif phone.startswith("0"):
        return "+254" + phone[1:]
    else:
        return phone