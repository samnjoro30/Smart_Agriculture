import os
from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa
from io import BytesIO
from fastapi import HTTPException

# Path to your templates folder
TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "..", "templates")
env = Environment(loader=FileSystemLoader(TEMPLATE_PATH))

class PDFUtility:

    @staticmethod
    def render_to_pdf(template_src: str, context_dict: dict):
        """
        Renders a Jinja2 template into a PDF byte stream.
        """
        template = env.get_template(template_src)
        html_content = template.render(context_dict)
        
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html_content.encode("UTF-8")), result)
        
        if not pdf.err:
            return result.getvalue()
        
        raise HTTPException(status_code=500, detail="PDF Generation Error")