import asyncio
from datetime import datetime, timedelta
from .services import WebSocketManager

async def cleanup_dead_connections(manager: WebSocketManager):
    while True:
        now = datetime.utcnow()
        timeout = timedelta(seconds=60)

        for user_id, connections in list(manager.active_connections.items()):
            for conn in connections[:]:
                if now - conn.last_seen > timeout:
                    try:
                        await conn.websocket.close()
                    except:
                        pass
                    manager.disconnect(conn.websocket, user_id)

        await asyncio.sleep(30)