from passlib.context import CryptContext
from fastapi.concurrency import run_in_threadpool

password_con = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def hash_password(password: str) -> str:
    return await run_in_threadpool(hash_password, password)

async def verify_password(plain: str, hashed: str) -> bool:
    return await run_in_threadpool(verify_password, plain, hashed)