# Base image
FROM php:5.6-apache

# MAINTAINER XXX <XXX (at) YYY (dot) com>

RUN a2enmod rewrite expires

ENV JBSAPP_VERSION 0.01

# install the PHP extensions we need
RUN apt-get update && apt-get install -y libpng12-dev libjpeg-dev && rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
	&& docker-php-ext-install gd mysqli opcache

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=60'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=1'; \
	} > /usr/local/etc/php/conf.d/opcache-recommended.ini

VOLUME /var/www/html/wp-content

ENV WORDPRESS_VERSION 4.5.3
ENV WORDPRESS_SHA1 835b68748dae5a9d31c059313cd0150f03a49269

# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress
RUN curl -o wordpress.tar.gz -SL https://wordpress.org/wordpress-${WORDPRESS_VERSION}.tar.gz \
	&& echo "$WORDPRESS_SHA1 *wordpress.tar.gz" | sha1sum -c - \
	&& tar -xzf wordpress.tar.gz -C /usr/src/ \
	&& rm wordpress.tar.gz \
	&& chown -R www-data:www-data /usr/src/wordpress

# AngularJS: install our dependencies and nodejs
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
# W: GPG error: http://archive.ubuntu.com precise Release: The following
# signatures couldn't be verified because the public key is not available:
# NO_PUBKEY 40976EAF437D05B5
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
RUN apt-get update
# RUN apt-get -y install python-software-properties git build-essential
#RUN apt-get -yq install git bzip2 automake build-essential
#RUN apt-get -y install nodejs
#RUN npm install -g bower    # Install bower
#RUN npm install -g gulp     # Install Gulp
# Install Node.js
# RUN apt-get install -y python-gi software-properties-common && \
#    add-apt-repository -y ppa:chris-lea/node.js && \
#	apt-get update && apt-get install -y nodejs &&\
#    npm install -g grunt-cli
# install nodejs and npm

# verify gpg and sha256: http://nodejs.org/dist/v0.10.30/SHASUMS256.txt.asc
# gpg: aka "Christopher Dickinson <christopher.s.dickinson@gmail.com>"
# gpg: aka "Colin Ihrig <cjihrig@gmail.com>"
# gpg: aka "keybase.io/octetcloud <octetcloud@keybase.io>"
# gpg: aka "keybase.io/fishrock <fishrock@keybase.io>"
# gpg: aka "keybase.io/jasnell <jasnell@keybase.io>"
# gpg: aka "Rod Vagg <rod@vagg.org>"
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys 9554F04D7259F04124DE6B476D5A82AC7E37093B 94AE36675C464D64BAFA68DD7434390BDBE9B9C5 0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 FD3A5288F042B6850C66B31F09FE44734EB7990E 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 DD8F2338BAE7501E3DD5AC78C273792F7D83545D

ENV NODE_VERSION 4.1.2
ENV NPM_VERSION 3.x-next

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --verify SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc \
    && npm install -g npm@"$NPM_VERSION" \
    && npm cache clear /
	&& apt-get install ruby-full /
	&& apt-get install rubygems /
	&& gem install sass

# Copy /app folder <APP>- Theme & Plugin
# https://github.com/ubermuda/docker-wordpress/blob/master/Dockerfile
# GIT
 ##COPY ./wp-content /usr/src/wordpress/wp-content
# ADD wp-content <UNA_RUTA>/wp-content/
##RUN chown -R www-data /usr/src/wordpress/wp-content
# RUN cp -r ./wp-content/* /var/www/html
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# Acá se instala AngularJS TO-DO
##RUN cd /usr/src/wordpress/wp-content/themes/wp-angular/ && npm install
#RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
#WORKDIR /opt/app
#ADD . /opt/app

#CMD npm start

#EXPOSE 3000

COPY docker-entrypoint.sh /entrypoint.sh

# Inicializar db
# ADD my-init-file.sql /my-init-file.sql

# grr, ENTRYPOINT resets CMD now
ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]
#CMD ["apache2-foreground", "node", "mysqld", "--init-file=/my-init-file.sql"]
