<?php

	include 'simpleconn.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$ID = $request->ID;
	$checkin = $request->checkin;

	$query = $mysqli->query("UPDATE todotable SET checkin=$checkin WHERE ID = $ID;");

	mysqli_close($conn);

?>