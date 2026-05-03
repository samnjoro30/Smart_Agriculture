# from sqlalchemy import select, func
# from modules.payments.model import PaymentCheck, PaymentTransaction

# class AdminFinanceRepository:
#     def __init__(self, session: AsyncSession):
#         self.session = session

#     async def get_financial_metrics(self):
#         # 1. Total Successful Revenue (from Transactions)
#         revenue_stmt = select(func.sum(PaymentTransaction.amount))

#         # 2. M-Pesa Success Rate (from PaymentCheck)
#         success_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "SUCCESS")
#         failed_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "FAILED")
#         pending_stmt = select(func.count(PaymentCheck.id)).where(PaymentCheck.status == "PENDING")

#         # 3. Recent Transactions with User info
#         # We join with Users to show who paid
#         recent_stmt = (
#             select(PaymentTransaction, Users.username)
#             .join(Users, PaymentTransaction.user_id == Users.id)
#             .order_by(PaymentTransaction.created_at.desc())
#             .limit(10)
#         )

#         # Execute
#         rev_res = await self.session.execute(revenue_stmt)
#         succ_res = await self.session.execute(success_stmt)
#         fail_res = await self.session.execute(failed_stmt)
#         pend_res = await self.session.execute(pending_stmt)
#         recent_res = await self.session.execute(recent_stmt)

#         return {
#             "total_revenue": rev_res.scalar() or 0,
#             "stats": {
#                 "success": succ_res.scalar() or 0,
#                 "failed": fail_res.scalar() or 0,
#                 "pending": pend_res.scalar() or 0,
#             },
#             "recent": recent_res.all()
#         }
