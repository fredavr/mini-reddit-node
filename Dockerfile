FROM node:24.11-alpine3.22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY . .

# 
# 1-Récupérer les arguments de build
ARG MONGO_URI
ARG JWT_SECRET 
ARG PORT
#2- On transforme ces arguments en variables d'environnement persistante
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT

EXPOSE 3000

ENTRYPOINT ["node","index.js"]

# Ce Dockerfile sera exécuté dans le docker-compose