# jbsrur
Instalación
===========

Pre-requesitos
--------------

[(docker)](https://www.docker.com/ " (docker)")
[(Git)](https://git-scm.com/ " (Git)")

Base de datos
-------------

Se utiliza [(5.7/Dockerfile)](https://hub.docker.com/_/mysql/ " (5.7/Dockerfile)")


`sudo docker run --name wpdb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wp -d mysql:5.7`


Front+Backend del sitio
-----------------------
Clonar el repositorio

`git clone https://github.com/marilynpi/jbsrur.git`

Actualizar permisos y acceder a la carpeta

`sudo chmod -R 777 jbsrur && cd jbsrur`

Genererar la imagen wp+angular

`docker build -t wp-angular .`

Linkear contenedores wp + db

`docker run -e WORDPRESS_DB_PASSWORD=root -d -p 127.0.0.2:8080:80 -v "$PWD"/wp-content:/var/www/html/wp-content -t -i --name wp-angular --link wpdb:mysql  wp-angular`

Post-instalación:
-------------------------------------

Contenedores:

`docker start wpdb`

`docker start wp-angular`

Para acceder a una terminal del contenedor:

`docker exec -i -t wp-angular /bin/bash`

Base de Datos

Exportar

`docker exec -i wpdb mysqldump --databases -u<db_user> -p<db_password> <db_name> > <db_file>.sql`

Importar

`docker exec -i wpdb mysql -u<db_user> -p<db_password> <db_name> < <db_file>.sql`

Exportar fichero desde el contenedor al localhost

`docker cp <containerId>:/path/<file> /path-host/<file>`

Agregar host

- Agregar la siguiente línea en /etc/hosts

`127.0.0.2       jbsrur`

Acceder a la app

`http://jbsrur:8080`

