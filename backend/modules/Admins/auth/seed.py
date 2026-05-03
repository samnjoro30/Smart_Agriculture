import asyncio
from config.database import AsyncSessionLocal
from .model import Admin
from utils.hashing import hash_password
from sqlalchemy import select


async def seed():
    async with AsyncSessionLocal() as db:
        # 1. Check if the admin already exists to prevent duplicate errors
        admin_email = "samnjoro@gmail.com"
        query = select(Admin).where(Admin.email == admin_email)
        result = await db.execute(query)
        existing_admin = result.scalar_one_or_none()

        if existing_admin:
            print(f"Admin with email {admin_email} already exists. Skipping...")
            return

        # 2. Create the new admin
        print(f"Seeding admin: {admin_email}...")
        new_admin = Admin(
            full_name="samuel njoroge",
            email=admin_email,
            password=await hash_password(
                "Samnjoro@2030"
            ),  # Ensure hash_password uses bcrypt/argon2
        )

        try:
            db.add(new_admin)
            await db.commit()
            print("Admin seeded successfully!")
        except Exception as e:
            await db.rollback()
            print(f"An error occurred during seeding: {e}")


if __name__ == "__main__":
    # If you are on Windows and see "Event loop is closed" errors,
    # you can use: asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
