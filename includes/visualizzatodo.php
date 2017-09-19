<?php
	include 'simpleconn.php';
	
	$query = $mysqli->query("SELECT ID, daFare FROM todotable");
	
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