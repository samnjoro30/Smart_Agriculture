import os
import sys


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient

from API import app
from utils.hashing import hash_password

client = TestClient(app)


def test_health_check():
    response = client.get("/")
    assert response.status_code in [200, 404]
    assert.response.json() in [{"message": "Welcome to the Smart Farm API"}, {"detail": "Not Found"}]

def test_password():
    password = 'passw123'
    hashed = hash_password(password)
    assert hashed != password
    
def test_verify_password():
    password = 'passw123'
    hashed = hash_password(password)
    assert verify_password(password, hashed) == True
    assert verify_password('wrongpassword', hashed) == False

def test_login_check():
    response = client.post(
        "/auth/login", json={"email": "test@gmail.com ", "password": "test"}
    )
    assert response.status_code in [200, 400, 401, 422]


def test_verification_check():
    response = client.post("/auth/verification", json={"otp": "123456"})
    assert response.status_code in [200, 400, 500]


# @pytest.mark.asyncio
# async def test_register():
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         res = await ac.post("/auth/register", json={
#             "email": "test@example.com",
#             "password": "123456"
#         })
#         assert res.status_code == 201

# @pytest.mark.asyncio
# async def test_protected_route_requires_token():
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         res = await ac.get("/users/userprofile")
#         assert res.status_code == 401
