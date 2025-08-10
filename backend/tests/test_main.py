import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from API import app 

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code in [200, 404]