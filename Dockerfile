# Builds the React frontend and serves it from the Express backend (single service).
FROM node:20-alpine AS web
WORKDIR /web
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
# Empty string = same-origin API calls
ENV REACT_APP_API_URL=""
ENV CI=false
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY backend/ ./
COPY --from=web /web/build ./public
EXPOSE 5001
CMD ["node", "server.js"]
