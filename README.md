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

Exportar base de datos

`root@1bfb66c0ebe6:/# mysqldump --databases --user=<db_user> --password <db_name> > db_nav_header.sql`
