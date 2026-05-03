import os
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from io import BytesIO
from fastapi import HTTPException

# Path to your templates folder
TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "..", "templates")
env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))


class PDFUtility:
    @staticmethod
    def render_to_pdf(template_src: str, context_dict: dict):
        """
        Renders a Jinja2 template into a PDF using WeasyPrint.
        """
        try:
            # 1. Render the HTML with Jinja2
            template = env.get_template(template_src)
            html_content = template.render(context_dict)

            # 2. Convert HTML string to PDF bytes
            pdf_bytes = HTML(string=html_content).write_pdf()

            return pdf_bytes

        except Exception as e:
            print(f"PDF Generation Error: {str(e)}")
            raise HTTPException(
                status_code=500, detail=f"Failed to generate PDF: {str(e)}"
            )
