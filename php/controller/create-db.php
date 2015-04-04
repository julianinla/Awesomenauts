<?php 

	require_once(__DIR__ . "/../model/config.php"); 
	//used for linking to model

	//table for users
	$query = $_SESSION["connection"]->query("CREATE TABLE users (" //creating the table
			. "id int(11) NOT NULL AUTO_INCREMENT," //automatically increment based on id
			. "username varchar(30) NOT NULL," //output for username, 30 characters
			. "password char(128) NOT NULL," //output for password, 128 characters
			. "salt char(128) NOT NULL," //salt? for security for website
			. "exp int(4),"
			. "exp1 int(4),"
			. "exp2 int(4),"
			. "exp3 int(4),"
			. "exp4 int(4),"
			. "DateTime datetime NOT NULL,"
			. "PRIMARY KEY (id))" /* create primary key */);  
	//used for creating table 
	//stores created users

?>