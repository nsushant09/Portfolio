# Stage 1: Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project (Vite outputs to 'dist' folder)
RUN npm run build

# Stage 2: Production stage
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you use React Router (see step 2 below)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]