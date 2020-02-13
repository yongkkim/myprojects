<?php
include("library.lib");
session_start();
if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "") 
{

    $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	echo $redirect;
    header("Location: $redirect");
}
if(empty($_SESSION['login']))//if users recently logged in, those users go to view page.
{
	$password = '';//creating objects from classes and connecting to database.
	$username = '';
	$error = '';
	$sccess = true;
	$forgot = false;
	$log_menu = new allmenu();
	$dbase = new db();
	$emailSent = 0;
	
	if(isset($_SESSION['email'])){
		$emailSent = true;	
	}
	
	if($_POST)
	{
		$password = '';//creating objects from classes and connecting to database.
		$username = '';
		$check = false;
		$sccess = true;
		$forgot = false;
		$log_menu = new allmenu();
		$dbase = new db();
		$check_string = $dbase->connect();

		if(isset($_POST['username']) && $_POST['username'] !== ''){	
			$username = $check_string->real_escape_string($_POST['username']);
			$password = $check_string->real_escape_string($_POST['password']);
			$check = true;
		}else{
			$username = "";
			$password = "";
		}
		
		if(isset($_GET['signin'])) {
			if(!empty($_POST['username3']) && !empty($_POST['password2']) && !empty($_POST['password3']) && !empty($_POST['hint'])){
				$query = "select * from users where username like '". $_POST['username3'] ."'";
				$result = $dbase->sql_query($query);
				if(mysqli_num_rows($result) <= 0){
					if($_POST['password2'] === $_POST['password3']){
					$encrypted = password_hash($_POST['password2'], PASSWORD_DEFAULT);
					$query = 'INSERT INTO users (username, password, role, passwordHint) VALUES("'. $_POST['username3'] .'","'. $encrypted .'","user", "'. $_POST['hint'] .'")';
					$result = $dbase->sql_query($query);
					$_SESSION['create'] = "Successfully created";
					header('Location: index.php?create=1');
					}else{
						$error = "Password doesn't match";
					}
				}else{
					$error = "Username already exists";
				}	
			}else{
				$error = "Please enter all fields";
			}
		}else{
			if($check){
				$squery = 'select * from users where username = "'. $username .'"';
				$result = $dbase->sql_query($squery);
				
				if(mysqli_num_rows($result) > 0)//if the query above has information,
				{
					$row = mysqli_fetch_assoc($result);//retrieving rows of information from the table,
					$encrypted = crypt($password, $row['password']);//and password from user input is encrypted with salt from password from database table. 
					//echo $encrypted . $row['password'];
					
					if($encrypted != $row['password'])//and finally check if the encrypted password above is same as an encrypted password from database table.
					{
						$error = "invalid username or password";
						$sccess = false;
						//if not matching, print message and set success variable as false
					}
					else if($encrypted == $row['password'])//if matching, make session variables for  username, password, role, and login status and then go to view page.
					{
						$_SESSION['user'] = $username;
						$_SESSION['passw'] = $encrypted;
						$_SESSION['role'] = $row['role'];
						$_SESSION['login'] = true;
						header('Location: view.php');
						exit();
					}
				}else if(mysqli_num_rows($result) <=0){//if there is no information, set success variable as false.
					$error = "invalid username or password";
					$sccess = false;
				}
			}else{
				$sccess = false;
				$error = "Please enter information";
			}
		}				
		$dbase->close();	
		
	}
	
	if(!$_POST && !isset($_GET['forgotpw']) || !$sccess || isset($_GET['forgotpw']) || isset($_GET['signin']))
	{
		//if users click forgot password link, this retrieves get value from that link and directs to other text feild for typing username to match with right password.
	?>
<!DOCTYPE html>
<html lang = "en">
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">	  
	  <link href="style.css" rel="stylesheet">
	  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	</head>
	<body>
	<div id = "loginBox">
	<?php if(isset($_GET['create'])): ?>
			<div class = "popup"><h2><?php echo $_SESSION['create']; ?></h2></div>
		<?php endif; ?>
	<div id = "backgroundImg"></div>
	<div id = "container">
		<?php
		if(!isset($_GET['forgotpw']) && !isset($_GET['signin'])){
		?>
		<h1 id = "title"> Book Collection </h1>
		<div id = "login-table">
		<form method = "post">
			<table id = "login">
				<tr>
					<td><input type = "text" name = "username" placeholder = "Username"/></td>
				</tr>
				<tr>
					<td><input type = "password" name = "password" placeholder = "Password"/></td>
				</tr>
				<tr>
					<td><a href = "./index.php?forgotpw=1">Forgot Password</a></td>
				</tr>
				<tr>
					<td><input type = "submit" name = "submit" value = "Login" class="btn btn-primary"/></td>
				</tr>
				<tr>
					<td>No account yet? <a href = "./index.php?signin=1">Sign in</a></td>
				</tr>
				<tr>
					<td id = "errorBox"><?php echo $error;?></td>
				</tr>
			</table>
		</form>
		</div>
		<?php }else if(isset($_GET['forgotpw'])){ ?>
		<h1 id = "title"> Password Hint </h1>
		<div id = "hint-table">
		<form method="post" action = "email.php">
		<table id = "hint">
			<tr>
				<td><input type="text" name="username2" placeholder = "Username"/></td>
			</tr>
			<tr>
				<td><input type="text" name="email" placeholder = "Email"/></td>
			</tr>
			<tr>
				<td><input type="submit" value="Send" class="btn btn-primary"/></td>
			</tr>
			<tr>
					<td id = "errorBox"><?php 
					if(isset($_SESSION['email'])){
						echo $_SESSION['email'];
					}
					?>
					</td>
			</tr>
			<tr>
				<td><a href = "resetSession.php">Back to login</a></td>
			</tr>
		</table>
		</form>
		</div>
	<?php }else if(isset($_GET['signin'])){ ?>
		<h1 id = "title"> Welcome! </h1>
		<div id = "signin-table">
		<form method="post">
		<table id = "signin">
			<tr>
				<td><input type="text" name="username3" placeholder = "Username"/></td>
			</tr>
			<tr>
				<td><input type="password" name="password2" placeholder = "Password"/></td>
			</tr>
			<tr>
				<td><input type="password" name="password3" placeholder = "Re-password"/></td>
			</tr>
			<tr>
				<td><input type="text" name="hint" placeholder = "Hint for password"/></td>
			</tr>
			<tr>
				<td><input type="submit" name = "submit" value="Create" class="btn btn-primary"/></td>
			</tr>
			<tr>
				<td><a href = "resetSession.php">Back to login</a></td>
			</tr>
			<tr>
				<td id = "errorBox"><?php echo $error;?></td>
			</tr>
		</table>
		</form>
		</div>
	<?php }?>
	</div>
	</div>
	<script>
	if("<?php echo $error; ?>".length > 0 || <?php echo $emailSent; ?> == true){
		document.getElementById("errorBox").style.backgroundColor = "#ff4d4d";
	}else{
		
		document.getElementById("errorBox").style.backgroundColor = "white";
	}
	</script>
	<?php
	$log_menu->footer();
	?>
	</body>
</html>
<?php
	}
} 
else{
	header('Location: view.php');
	exit();
}
?>