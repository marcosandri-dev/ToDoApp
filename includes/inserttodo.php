<?php

	include 'simpleconn.php';

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$todo = $request->toDoText;

	$query2 = "INSERT INTO todotable VALUES (NULL, '$todo', 0, 0)";

	$query = $mysqli->query("INSERT INTO todotable VALUES (NULL, '$todo', 0, 0)");

	mysqli_close($conn);

	echo("Todo inserito: ".$todo);

?>