# Official python image
FROM python:3.9-slim

#working directory
WORKDIR /app

# Copy requirements 
COPY requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt

#Copy application code
COPY . .

#Expose port
EXPOSE 8000

#run the application

CMD ["uvicorn", "API:app", "--host", "0.0.0.0", "--port", "8000"]