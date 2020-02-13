<?php
include("library.lib");
require_once("Mail.php");
session_start();
	if(isset($_POST['username2']))
	{
		
		$dbase = new db();
		$query = 'select username, passwordHint from users where username = "'. $_POST['username2'] .'"';
		$result = $dbase->sql_query($query);
		
		if(mysqli_num_rows($result) > 0)//if the query above has information,
		{
			$row = mysqli_fetch_assoc($result);
			
			$from = '<dragonsoup2@gmail.com>';
			$to = '<' . $_POST['email'] . '>';
			$subject = "Password Hint";
			$body = "
			<html>
			  <head>
				<title>Password Hint</title>
			  </head>
			  <body>
				<p>" . $row['passwordHint'] . "</p>
			  </body>
			</html>
			";

			$headers = array(
				'From' => $from,
				'To' => $to,
				'Subject' => $subject,
				'Type' => "Content-Type: text/html; charset=ISO-8859-1"
			);

			$smtp = Mail::factory('smtp', array(
					'host' => 'ssl://smtp.gmail.com',
					'port' => '465',
					'auth' => true,
					'username' => 'dragonsoup2@gmail.com',
					'password' => 'Dydrnr123'
				));

			$mail = $smtp->send($to, $headers, $body);
			
			if(PEAR::isError($mail)){
				$_SESSION['email'] = "Not sent";
			}else{
				$_SESSION['email'] = "successfully sent!";
			}	
		}else if(mysqli_num_rows($result) <=0){
			$_SESSION['email'] = "Invalid username";
		}
		header('Location: index.php?forgotpw=1');
	}
?>