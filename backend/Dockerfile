# Use the stable python image already saved on your Mac
FROM python:3.11-slim

WORKDIR /app

# Install the dependencies your code needs directly via apt
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    build-essential \
    libpango-1.0-0 \
    libharfbuzz0b \
    libpangoft2-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info \
    && rm -rf /var/lib/apt/lists/*

# Install uv globally inside the container natively
RUN pip install --no-cache-dir uv gunicorn uvicorn

# Copy manifests and sync code
COPY pyproject.toml uv.lock* ./
RUN uv sync --frozen --no-install-project --no-dev

COPY . .

EXPOSE 8000

# Fire up the app using standard python execution paths
CMD ["uv", "run", "gunicorn", "API:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]