# Stage 1: build Next.js static export (out/)
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs ./
COPY src ./src
COPY public ./public
# Static export; at runtime the app is served from same origin as API, so /api is same host
ENV API_URL=
RUN npm run build

# Stage 2: backend + serve frontend from static/
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY backend ./backend
COPY --from=frontend /app/out ./static

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
