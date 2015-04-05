<?php
	require_once(__DIR__ . "/../model/config.php");

	function authenticateUser() {
		if(!isset($_SESSION["authenticated"])) {
			return false;
		}
		//checks whther it is set, user logged in
		else {
			if($_SESSION["authenticated"] != true) {
				return false;
			}
			else {
				return true;
			}
		}
	}

?>