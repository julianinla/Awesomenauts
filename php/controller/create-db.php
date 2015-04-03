<?php 

	require_once(__DIR__ . "/../model/config.php"); 
	//used for linking to model


	//table for posts
	$query = $_SESSION["connection"]->query("CREATE TABLE posts (" //create table for posts
			. "id int(11) NOT NULL AUTO_INCREMENT," //ids need info/auto increment
			. "title varchar(255) NOT NULL," //title is needed
			. "post text NOT NULL," //text needed
			. "DateTime datetime NOT NULL," //store datetime
			. "PRIMARY KEY (id))"); //created primary key?
	//used dfor creating table
	//identifies info for blog posts

	if($query){
		echo "<p>Successfully created table: posts</p>";
	}
	else {
		echo "<p" . $_SESSION["connection"]->error . "</p>";
	}
	//check if query exists, echo message
	//else give different message


	//table for users
	$query = $_SESSION["connection"]->query("CREATE TABLE users (" //creating the table
			. "id int(11) NOT NULL AUTO_INCREMENT," //automatically increment based on id
			. "username varchar(30) NOT NULL," //output for username, 30 characters
			. "email varchar(50) NOT NULL," //output for email, 50 characters
			. "password char(128) NOT NULL," //output for password, 128 characters
			. "salt char(128) NOT NULL," //salt? for security for website
			. "DateTime datetime NOT NULL,"
			. "PRIMARY KEY (id))" /* create primary key */);  
	//used for creating table 
	//stores created users

	if($query){
		echo "<p>Successfully created table: users</p>";
	}
	else {
		echo "<p" . $_SESSION["connection"]->error . "</p>";
	}
	//check if query exists, echo message
	//else give different message

?>