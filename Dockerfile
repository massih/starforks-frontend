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
COPY --from=build-step /app/setupEnv.sh /usr/bin/
RUN chmod +x /usr/bin/setupEnv.sh

EXPOSE 80
ENTRYPOINT [ "/usr/bin/setupEnv.sh" ]
CMD ["nginx", "-g", "daemon off;"]

