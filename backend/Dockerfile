
FROM ghcr.io/astral-sh/uv:debian-slim AS builder

WORKDIR /app
    
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
    
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libffi-dev \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
    
COPY pyproject.toml uv.lock* ./
    
RUN uv sync --frozen --no-install-project --no-dev
RUN uv pip install gunicorn uvicorn
    
FROM python:3.11-slim
WORKDIR /app
    
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*
    
COPY --from=builder /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
    
COPY . .
    
EXPOSE 8000
    
CMD ["gunicorn", "API:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]