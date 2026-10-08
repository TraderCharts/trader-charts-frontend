# =============================================
# Stage 1: Builder (compiles frontend)
# =============================================
FROM node:23.7.0-alpine AS builder

WORKDIR /app

# Copy only the files needed for dependency installation
COPY package*.json ./
COPY yalc.lock ./
COPY .yalc ./.yalc              
COPY scripts/ ./scripts/

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the source code
COPY src/ ./src
COPY public/ ./public
COPY services/ ./services
COPY jsconfig.json .
COPY *.js .
COPY *.json .
COPY .env* .

# Build the frontend (React)
RUN npm run build

# =============================================
# Stage 2: Development (docker-compose dev)
# =============================================
FROM node:23.7.0-alpine AS development

WORKDIR /app

# Install nodemon globally for hot reload
RUN npm install -g nodemon

# Copy files needed for development
COPY package*.json ./
COPY scripts/ ./scripts/
COPY src/ ./src
COPY public/ ./public
COPY services/ ./services
COPY jsconfig.json .
COPY *.js .
COPY *.json .
COPY yalc.lock ./
COPY .yalc ./.yalc            

# Install all dependencies
RUN npm ci

# Expose port for development server
EXPOSE 3001

# Start development server with hot reload
CMD ["npm", "run", "start-develop"]

# =============================================
# Stage 3: Production (lean image)
# =============================================
FROM nginx:alpine AS production

# Copy compiled frontend artifacts from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port for serving frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
