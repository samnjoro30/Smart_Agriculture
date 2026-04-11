import requests
from config.setting import get_settings

settings = get_settings()

try:
    route_res = requests.get(settings.KAI_ROUTE_API_KEY, timeout=10)
    server_url = route_res.json().get("serverUrl")

    if not server_url:
        raise Exception("No active server")

except Exception as e:
    server_url = None
    print(f"Error fetching KAI route: {str(e)}")