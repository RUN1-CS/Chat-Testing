# Apache + PHP 8.2
FROM php:8.2-apache

# Enable modules: rewrite, proxy for WS, headers, SSL
RUN a2enmod rewrite proxy proxy_http proxy_wstunnel headers ssl

# Install PostgreSQL PDO extension
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Copy Apache virtual host config (matches your tree)
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# Copy web app code
COPY www/ /var/www/html/

# Set working directory
WORKDIR /var/www/html
