import re

def detect_identifier(identifier: str) -> str:
    identifier = identifier.strip()

    # email detection
    if re.match(r"[^@]+@[^@]+\.[^@]+", identifier):
        return "email"
    # phone detection (digits, + allowed)
    if re.match(r"^\+?\d{9,15}$", identifier):
        return "phone"
    # otherwise treat as username
    return "username"


def normalize_identifier(identifier: str):
    identifier = identifier.strip()
    if "@" in identifier:  # simple email check
        return "email", identifier.lower()
    elif identifier.isdigit() or identifier.startswith("0"):  # phone
        # Convert 07xxxx to +2547xxxxxxx (Kenya example)
        if identifier.startswith("0"):
            return "phone", "+254" + identifier[1:]
        return "phone", identifier
    else:  # assume username
        return "username", identifier.lower()
  
