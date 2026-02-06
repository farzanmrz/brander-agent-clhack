# Backend on port 3000 (or $PORT on Render). Serves API + React build from ./static.
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY app ./app
# Pre-built frontend: add static/ to build context (e.g. from frontend/build) before docker build
COPY static ./static

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
