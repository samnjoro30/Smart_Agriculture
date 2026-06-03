from fastapi import WebSocket
from .services import WebSocketManager
from config.security import get_current_user
from fastapi import APIRouter

app = APIRouter()


@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    token = websocket.query_params.get("token")
    # user_id = await get_current_user(token=token)
    try:
        user = await get_current_user(token=token)
        if str(user.id) != user_id:
            await websocket.close(code=1008)
            return

    except Exception:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, user_id)

    try:
        while True:
            data = await websocket.receive_text()
            if data == "pong":
                manager.update_heartbeat(user_id, websocket)
    except Exception as e:
        manager.disconnect(websocket, user_id)
