<?php
	include 'simpleconn.php';
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);	
	$type = $request->type;

	switch ($type){
		case "getAll":
			$query = $mysqli->query("SELECT * FROM todotable WHERE checkin=0");
			break;
		
		case "getLast":
			$query = $mysqli->query("SELECT * FROM todotable ORDER BY ID DESC LIMIT 1");
			break;
	}


	if(mysqli_num_rows($query) > 0){
		while($row = mysqli_fetch_assoc($query)){
			$data[] = $row;
		}
	} else {
		echo "0 results";
	};
	print json_encode($data);
	mysqli_close($conn);
	echo($outp);

?>