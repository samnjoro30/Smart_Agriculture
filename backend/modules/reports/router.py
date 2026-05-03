from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    BackgroundTasks,
    status,
)
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from uuid import UUID
from config.database import get_db
from config.audit.logger import get_logger
from config.setting import get_settings
from config.security import get_current_user
from starlette.status import HTTP_201_CREATED

from .schema import (
    FinancialReportItem,
    FinancialReportResponse,
    ReportCreateSchema,
    ReportReadSchema,
)
from .service import ReportService

router = APIRouter(prefix="/reports", tags=["reports"])
logger = get_logger("REPORTS")
settings = get_settings()


@router.post(
    "/request", response_model=ReportReadSchema, status_code=status.HTTP_201_CREATED
)
async def request_report(
    payload: ReportCreateSchema,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Initializes a report generation request.
    Returns a PENDING report record that the user can then pay for.
    """
    return await ReportService.create_report_request(db, current_user.id, payload)


@router.get("/financial", response_model=FinancialReportResponse)
async def get_financial_summary(
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Fetches the aggregated financial data from the Ledger (PaymentTransaction).
    This is used to populate the 'View' before downloading the PDF.
    """
    return await ReportService.get_financial_ledger_data(
        db, current_user.id, start_date, end_date
    )


@router.get("/download/{reportId}")
async def download_report_pdf(
    report_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # 1. Call service to get the binary data
    pdf_bytes, report_name = await ReportService.get_report_pdf_binary(
        db, report_id, current_user.id
    )

    # 2. Return the response with correct headers
    # Content-Disposition "attachment" forces the browser to download instead of view
    file_name = f"{report_name}_{datetime.now().strftime('%Y%m%d')}.pdf"

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={file_name}"},
    )


@router.get("/receipt/{payment_id}")
async def download_payment_receipt(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Generates and downloads a receipt based on the M-Pesa Callback (PaymentCheck).
    """
    return await ReportService.generate_receipt_pdf(db, payment_id, current_user.id)


@router.get("/status/{reportId}", response_model=ReportReadSchema)
async def check_report_status(
    report_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Endpoint for the frontend to poll the status of a report generation request.
    """
    return await ReportService.get_report_by_id(db, report_id, current_user.id)
