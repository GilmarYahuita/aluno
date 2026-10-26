FROM nginx:alpine

ENV PORT=8080

COPY public/ /usr/share/nginx/html/
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
