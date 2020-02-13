<?php
include "library.lib";//this php file declares values which are yes or no(y or n) for deleted column for each id
		//every time the value is changed, it keeps on updating new values.

session_start();
		
if($_SESSION['login'] == true)//if you log in successfully
{
		$datbase = new db();
		$datbase->connect();
		$id = $_GET['id'];
		$query = "delete from inventory where id = $id";
		$result = $datbase->sql_query($query);
	
		if(isset($_SESSION['sort_table']))
		{
			$id = $_SESSION['sort_table'];
			header("Location: view.php?sorting=$id");
			exit();
		}
		else
		{
			header("Location: view.php");
			exit();
		}
}
else
{
	header('Location: index.php');//if log-in is not successful, go back to log-in page
	exit();
}
		?>
