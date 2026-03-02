from fastapi.concurrency import run_in_threadpool
from passlib.context import CryptContext

password_con = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def hash_password(password: str) -> str:
    return await run_in_threadpool(password_con.hash, password)


async def verify_password(plain: str, hashed: str) -> bool:
    return await run_in_threadpool(password_con.verify, plain, hashed)
