Node List
=========
A simple to-do list application built on node.js.

Installation
------------
To set up the database, use the MySQL command-line utility to load the `db_config.sql` script in the root of the project. The command should look something like this:

	$ mysql < db_config.sql

You will also need to set up `views/base.js` with your login credentials. Find the following lines and change the values to your MySQL username and password:
 
	client.user = 'root';
	client.password = 'password';

After that you're good to go!

Notes
-----
Make sure your pwd is the directory that contains the `index.js` file when you start the server, otherwise the application will not be able to serve static files.

Application is currently set to run on port 8888. This is a completely arbitrary selection. If you would like to change the port number, update the `createServer` function found on line 178 in `index.js`.

This is my first stab at a node.js application. Any and all feedback is much appreciated!
