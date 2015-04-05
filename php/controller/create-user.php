<?php 

	require_once(__DIR__ . "/../model/config.php");
	//link to our config

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	//recieving the input for our email/username, filtering it 

	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
	//same things for our password

	//encryption
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

	$hashedPassword = crypt($password, $salt);
	//encrypting the password/salt

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
	. "username = '$username', " 
	. "password = '$hashedPassword', "
	. "salt = '$salt', "
	. "exp = 0, "
	. "exp1 = 0, "
	. "exp2 = 0, "
	. "exp3 = 0, "
	. "exp4 = 0" 
	);
	//connection as we have done

	$_SESSION["name"] = $username;

	if($query){
		echo false;
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}

?>