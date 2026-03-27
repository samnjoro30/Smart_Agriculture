from datetime import datetime

def make_naive(dt: datetime | None):
    if dt and dt.tzinfo is not None:
        return dt.replace(tzinfo=None)
    return dt