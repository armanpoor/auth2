# Stage 1: Build the Angular application
FROM node:14 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/angular-bookstore /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
