# Stage 1: build Next.js static frontend (same-origin API)
FROM node:20-alpine AS frontend
WORKDIR /app
ENV NEXT_PUBLIC_API_URL=
COPY package.json package-lock.json* ./
RUN npm ci
COPY next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs ./
COPY src ./src
COPY public ./public
RUN npm run build

# Stage 2: run FastAPI + serve frontend static files
FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY backend ./backend
COPY --from=frontend /app/out ./out

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
