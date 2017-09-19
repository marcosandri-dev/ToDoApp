<?php

	include 'simpleconn.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$ID = $request->ID;

	$query = $mysqli->query("DELETE FROM todotable WHERE ID = $ID;");

	mysqli_close($conn);

	echo("Todo inserito: ".$ID);

?>