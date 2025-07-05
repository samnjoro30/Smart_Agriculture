from passlib.context import CryptContext

password_con = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return password_con.hash(password)

def verify_password(plain_password, hashed_password) -> bool:
    return password_con.verify(plain_password, hashed_password)