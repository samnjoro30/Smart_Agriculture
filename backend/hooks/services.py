from fastapi import WebSocket
from typing import Dict, List
import json
from datetime import datetime
import asyncio

class Connection:
    def __init__(self, websocket: WebSocket, user_id: str):
        self.websocket = websocket
        self.user_id = user_id
        self.connected_at = datetime.utcnow()
        self.last_seen = datetime.utcnow()

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[str, List[Connection]] = {}
    
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        conn = Connection(websocket, user_id)
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(conn)
    
    def disconnect(self, websocket: WebSocket, user_id: str):
        if user_id in self.active_connections:
            self.active_connections[user_id] = [
                conn for conn in self.active_connections[user_id] if conn.websocket != websocket
            ]
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    def update_heartbeat(self, user_id: str, websocket: WebSocket):
        if user_id in self.active_connections:
            for conn in self.active_connections[user_id]:
                if conn.websocket == websocket:
                    conn.last_seen = datetime.utcnow()
    
    async def send_json_message(self, message: str, user_id: str):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                try:
                    await connection.websocket.send_text(message)

                except Exception:
                    self.disconnect(connection, user_id)

    async def send_ping(self):
        while True:
            for user_id, connections in list(self.active_connections.items()):
               for conn in connections:
                    try:
                        await conn.websocket.send_text(json.dumps({"type": "ping"}))
                    except:
                        self.disconnect(conn.websocket, user_id)

            await asyncio.sleep(25)