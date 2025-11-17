# PHP site built on Apache httpd
FROM php:8.2-apache

# Copy the repository (filtered by .dockerignore) into Apache's document root.
COPY . /var/www/html

# Surface the favicon at the expected root path for browsers if present.
RUN cp /var/www/html/public/favicon.ico /var/www/html/favicon.ico 2>/dev/null || true

EXPOSE 80
