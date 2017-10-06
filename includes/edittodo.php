<?php

	include 'simpleconn.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$ID = $request->ID;

	$query = $mysqli->query("UPDATE todotable SET checkin=1 WHERE ID = $ID;");

	mysqli_close($conn);

?>