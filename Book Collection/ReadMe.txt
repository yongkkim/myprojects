Hi! my name is Yong Kuk Kim and I have built a website using PHP to store book information.

There are few things you need to follow:

1. You need to import BookCollection.sql file in order to create database and two tables.
2. If you are using xampp, in order to use mail functionality by clicking a link, "Forgot password", 
you need to install Mail.php by opening 'shell' and use this command, "pear install -a Mail".
3. Open httpd.conf file and search a block starting with "<Directory" and explanation like below

# Deny access to the entirety of your server's filesystem. You must
# explicitly permit access to web content directories in other 
# <Directory> blocks below.

and then modify the Directory block like below

<Directory />
          Options Indexes MultiViews FollowSymLinks
          AllowOverride All
          Order allow,deny
          Allow from all
</Directory>


Enjoy!