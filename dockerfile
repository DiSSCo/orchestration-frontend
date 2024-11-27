# Pull official node image as base
FROM node:20.15.1-alpine3.19 as build

# Set working directory
WORKDIR /orchestration-frontend

# Install dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install npm@10.8.2

# Copy application
COPY . ./

# Generate Type Files
RUN npm install typescript -g

RUN tsc 'src/app/GenerateTypes.ts' --outDir 'src/app'
RUN cp 'src/app/GenerateTypes.js' 'src/app/GenerateTypes.cjs'
RUN rm 'src/app/GenerateTypes.js'
RUN node 'src/app/GenerateTypes.cjs'

# Setting app to production build
RUN npm run build

# Setting up NGINX
FROM nginx:stable-alpine

COPY --from=build /orchestration-frontend/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start application
CMD ["nginx", "-g", "daemon off;"]