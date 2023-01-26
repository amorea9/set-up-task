# syntax=docker/dockerfile:1
FROM node:19-alpine As development
WORKDIR /backend-setup
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci
COPY src/ src/
RUN npm run build
FROM node:19-alpine As production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=development /backend-setup/dist/ ./dist/
EXPOSE 3001
CMD ["node", "dist/main"]