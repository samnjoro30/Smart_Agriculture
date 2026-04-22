from fastapi import WebSocket
from typing import Dict, List
import json

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
    
    def disconnect(self, websocket: WebSocket, user_id: str):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]
        
    async def send_json_message(self, message: str, user_id: str):
        if user_id in self.active_connections:
            payload = json.dumps(data)
            for connection in self.active_connections[user_id]:
                try:
                    await connection.send_text(message)
                    
                except Exception:
                    self.disconnect(connection, user_id)