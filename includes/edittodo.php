<?php

	include 'simpleconn.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$ID = $request->ID;
	$toDo = $request->toDoText;
	$type = $request->type;

	switch ($type){
		case "checkbox":
			$query = $mysqli->query("UPDATE todotable SET checkin=1 WHERE ID = $ID;");
			break;
		
		case "todo":
			$query = $mysqli->query("UPDATE todotable SET daFare='$toDo' WHERE ID = $ID;");
			break;
	}

	mysqli_close($conn);

?>