<?php 

	require_once(__DIR__ . "/../model/config.php");
	//tells where we are

	$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
	$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
	$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
	$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
	$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);
	//exp vars passed from game to here

	$query = $_SESSION["connection"]->query("UPDATE USERS SET "
		. "exp = $exp, "
		. "exp1 = $exp1, "
		. "exp2 = $exp2, "
		. "exp3 = $exp3, "
		. "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"] . "\" " ); 
	//user table is updated on user account

	if(query) {
		echo "true";
	} //if successful echo true
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	} //if not explain error