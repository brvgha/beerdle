# Build stage
FROM node:20-slim as build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install -g typescript
RUN npm install

# Pass build arguments for environment variables
ARG VITE_API_URL
ARG VITE_API_KEY

# Set environment variables for the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy the build output to nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inform Docker that the container listens on port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
