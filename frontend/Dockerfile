
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

#dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm install

#dev stage
FROM base AS dev
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

#build stage
FROM base AS builder 
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

#production stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]