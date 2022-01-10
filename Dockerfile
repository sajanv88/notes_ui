FROM node:16-alpine3.15 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:stable-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
