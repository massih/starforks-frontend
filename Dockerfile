 # Stage 1
 # Get node
 FROM node:14.17.4-alpine as build-step

 # Copy files
 RUN mkdir -p /app
 WORKDIR /app
 COPY package.json /app

 # Install dependencies
 RUN npm install

# Copy app
 COPY . /app

# Build app
 RUN npm run build
 
# Stage 2
# Get nginx
FROM nginx:latest

# Copy required files
COPY --from=build-step /app/dist/Starforks /usr/share/nginx/html
EXPOSE 80