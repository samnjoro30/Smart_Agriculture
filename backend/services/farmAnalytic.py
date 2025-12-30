from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


async def get_farmData(email: str, db: AsyncSession):
    query = text(
        """
        SELECT date, produce, ExpectedMateDate FROM 'analyticFarmData' WHERE email = :email
    """
    )

    results = await db.execute(query, {"email": email})
    row = results.fetchone()

    if row:
        return {
            "date": row.date,
            "produce": row.produce,
            "ExpectedMateDate": row.ExpectedMateDate,
        }
    return None
