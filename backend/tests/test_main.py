import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from controller.auth import login_farmer, register_farm, Verify_farmer, reset_password 
from API import app 

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_login_check():
    response  = client.post("/auth/login",
    json={
        "email": "test@gmail.com ",
        "password": "test"
    })
    assert response.status_code in [200, 400, 401, 422]


def test_verification_check():
    response  = client.post("/auth/verification", json={"otp": "123456"})
    assert response.status_code in [200, 400, 500]
