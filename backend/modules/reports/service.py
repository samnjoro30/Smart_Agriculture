from uuid import UUID
from datetime import datetime
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
#from .utils.gen_pay import PDFUtility
from .repository import ReportRepository
from .schema import FinancialReportResponse, FinancialReportItem

class ReportService:

    @staticmethod
    async def create_report_request(db: AsyncSession, user_id: UUID, payload):
        """
        Logic to initialize a report record in the database.
        """
        return await ReportRepository.create_report_record(
            db, 
            user_id=user_id,
            report_type=payload.report_type,
            parameters={
                "start_date": payload.start_date.isoformat(),
                "end_date": payload.end_date.isoformat()
            }
        )

    @staticmethod
    async def get_financial_ledger_data(
        db: AsyncSession, 
        user_id: UUID, 
        start_date: datetime, 
        end_date: datetime
    ) -> FinancialReportResponse:
        """
        The core logic: Aggregates Income (Milk) and Expenses (Feeds/Others) 
        from the PaymentTransaction ledger.
        """
        # 1. Fetch all transactions for the period from the repository
        transactions = await ReportRepository.get_transactions_by_period(
            db, user_id, start_date, end_date
        )

        total_income = Decimal("0.00")
        total_expense = Decimal("0.00")
        report_items = []

        # 2. Process the ledger entries
        for tx in transactions:
            amount = Decimal(str(tx.amount))
            
            # Categorize based on your PaymentTransaction model logic
            if tx.transaction_type.upper() == "INCOME":
                total_income += amount
            else:
                total_expense += amount

            report_items.append(
                FinancialReportItem(
                    date=tx.created_at,
                    category=tx.category,
                    description=tx.description or f"{tx.category} transaction",
                    type=tx.transaction_type,
                    amount=amount
                )
            )

        # 3. Compile the response
        return FinancialReportResponse(
            report_id=None, # Or generate a temporary one
            farm_name="Your Farm Name", # You can fetch this from the User object
            start_date=start_date,
            end_date=end_date,
            total_income=total_income,
            total_expense=total_expense,
            net_profit=total_income - total_expense,
            transactions=report_items
        )

    @staticmethod
    async def get_report_by_id(db: AsyncSession, report_id: UUID, user_id: UUID):
        report = await ReportRepository.get_report_by_id(db, report_id)
        if not report or report.user_id != user_id:
            raise HTTPException(status_code=404, detail="Report not found")
        return report

    @staticmethod
    async def generate_receipt_pdf(db: AsyncSession, payment_id: UUID, user_id: UUID):
        """
        Fetches the M-Pesa PaymentCheck data and formats it for a receipt.
        """
        payment = await ReportRepository.get_payment_check_details(db, payment_id)
        if not payment or payment.user_id != user_id:
            raise HTTPException(status_code=404, detail="Payment record not found")
        
        # Here you would call your PDF utility (e.g., WeasyPrint) 
        # using the payment.mpesa_receipt_number and payment.amount
        return {"message": "PDF generation logic goes here", "receipt_no": payment.mpesa_receipt_number}

    # @staticmethod
    # async def get_report_pdf_binary(db: Session, report_id: UUID, user_id: UUID):
    #     # 1. Get report metadata from repository
    #     report_record = await ReportRepository.get_report_by_id(db, report_id)
    #     if not report_record or report_record.user_id != user_id:
    #         raise HTTPException(status_code=404, detail="Report not found")

    #     # 2. Extract dates from the JSON parameters we saved earlier
    #     start_date = report_record.parameters.get("start_date")
    #     end_date = report_record.parameters.get("end_date")

    #     # 3. Get the actual financial data using our existing service method
    #     financial_data = await ReportService.get_financial_ledger_data(
    #         db, user_id, start_date, end_date
    #     )

    #     # 4. Convert the Pydantic model to a dictionary for Jinja2
    #     template_context = financial_data.dict()

    #     # 5. Use the Utility to generate bytes
    #     pdf_bytes = PDFUtility.render_to_pdf("financial_report.html", template_context)
        
    #     return pdf_bytes, report_record.report_type