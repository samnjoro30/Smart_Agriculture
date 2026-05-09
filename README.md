# 🌱SMART AGRICULTURE 
 
For detailed system architecture refer to docs folder
 # Project Overview

 This is a modern monitoring system for Agriculture leveraging  modern web, AI, ML, and backend technologies to monitor, analyze, and automate agriculture operations.

It is built using a full-stack, cloud-native approach with technologies like FastAPI, Next.js, Docker, Supabase, and more.

Smart farm is a web-based livestock management system that helps dairy farmers digitize animal health, reproduction, and farm record-keeping.

The platform enables farmers to track breeding cycles, health events, treatments, and expenses to improve productivity and reduce preventable losses.


# Feature
- 🌱 Smart farm data collection and visualization
- 📡 API endpoints for future advancementments to sensors and drones
- 📊 Real-time dashboards and analytics
- 🔐 Secure authentication and role-based access
- 🔁 CI/CD for automated testing and deployment
- 🌐 Scalable infrastructure using Docker and cloud platforms

 ## Tech Stack

 ### Backend
 - **python 3.9 and above**
 - **FastAPI** - High-performance API
 - **Uvicorn** - ASGI server
 - **Node.js** - backend components
 - **Alembic** - handling db migrations
 - **Gunicorn** - WSGI HTTP server for production
 - **SQLAlchemy** - ORM for database operations
 - **Pydantic** - Data validation and settings management
- **Redis** - Caching and real-time data handling

 ### 🌐 Frontend
- **Next.js 14**
- **TypeScript**
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI**

### 🐳 Infrastructure
- **Docker** – Containerization
- **NGINX** – Reverse proxy, load balancer and frontend static file serving
- **GitHub Actions** – CI/CD automation
- **Render** - backend hosting
- **supabase** - postgre db
- **Neon** - Postgre db
- **vercel** - frontend hosting
- **Firebase** - frontend hosting
- **service worker** - for WPA


### 🛡️ Development Tools & Quality
- **Black** - Code formatting
- **isort** - Import statement organization
- **Ruff** - Extremely fast Python linter
- **mypy** - Static type checking
- **Bandit** - Security linter for Python
- **pre-commit hooks** - Automated code quality checks
- **pytest** - Testing framework
- **Coverage.py** - Code coverage analysis
---


---

## 🛠️ Getting Started

### Prerequisites
- Docker + Docker Compose
- Git
- Optional: Python (for local FastAPI dev), Node.js (for local frontend dev)
- Ensure you configure .env file as most  services won't work without it

### 🔧 Local Development

```bash
# Clone the repository
git clone https://github.com/samnjoro30/Smart_Agriculture.git
cd Smart_Agriculture


```

## Option 1: Run with Docker 
```bash
  docker-compose up --build
```

## option 2: Manual Development Setup for controlled development
### Navigate to backend folder and activate the environment
```bash
# backend folder
  cd backend
# create virtual environment (if not already created)
  python -m venv .venv
# activate environment
  source .venv/bin/activate
# install dependencies
  pip install -r requirements.txt
# run backend server
  uvicorn API:app --reload
```

### frontend server
```bash
# navigate to frontend structure
   cd frontend
   npm install
   npm run dev
```

### running celery worker 
```bash
   cd backend
# make sure redis is running before running celery worker
celery -A worker.celery_app worker \
  --loglevel=info \
  -Q livestock_service,default
```

# Backend Infrastructure

## Backend System Architecture
- for folder structure check out on docs/structure.md


### DevOps ecosystem(backend)



## Scurity features for backend
Bandit - for security linting

# Future Features

- 🌦️ Weather API integration

- 📍 GPS-based crop tracking

- 🤖 ML-based yield prediction

- 📲 Progressive Web App (PWA) support

- Mobile App built on flutter

