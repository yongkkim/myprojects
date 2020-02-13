<?php
	include "library.lib";
	session_start();
	if(isset($_SESSION['add'])): ?>
		<div class = "popup"><h2><?php echo $_SESSION['add']; ?></h2></div>
	<?php endif;
	
		if(isset($_SESSION['modify'])): ?>
		<div class = "popup"><h2><?php echo $_SESSION['modify']; ?></h2></div>
	<?php endif;

if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "") 
{

    $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    header("Location: $redirect");
}
if(isset($_SESSION['login']))//if login is successful,
{
		$modi = new modify();//creating objects from classes and connecting to database.
		$menu = new allmenu();
		$desc;
		$dabase = new db();
		$info = "";
		$html = $dabase->connect();
		$successful = true;

			//$menu->input();

			$_SESSION['sort_table'] = 'id'; //if both don't exists, use default(modified)

			if(empty($_GET['sorting']) && empty($_GET['add']))
			{
				//if click link and session not exists, use sort from get variable
				unset($_SESSION['search_text']);
			}
			
			if(isset($_GET['sorting']))
			{
				//if click link and session exists, use sort from get variable
				$_SESSION['sort_table']= $_GET['sorting'];
			}
			else if(isset($_COOKIE['info']))
			{
				$_SESSION['sort_table'] = $_COOKIE['info'];
			}
			
			if(isset($_SESSION['sort_table']))
			{
				setcookie("info", $_SESSION['sort_table'], time()-3601);
				setcookie("info", $_SESSION['sort_table'], time()+3600);
				$query = "select * from inventory order by ". $_SESSION['sort_table'] ."";
			}

			$query = $modi->search();
			//after chaning sorting value and search value through the if statments, finally run the query
			$result = $dabase->sql_query($query);
			
			if(mysqli_num_rows($result) <= 0)//check, if there is any information in this query
			{
				$successful = false;
				$query = "select * from inventory order by ". $_SESSION['sort_table'] ."";
				$result = $dabase->sql_query($query);
			}
	
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
	<div id = "backgroundImage" class = "img-responsive center-block">
	<div id = "bigger-container">
	<?php
	unset($_SESSION['add']);
	unset($_SESSION['modify']);
	$menu->input();
	?>
	<div id = "backgroundImg2"></div>
	<div id = "bigger-grid">
				
		<div class="grid-item g-header"><a href = "view.php?sorting=id">ID</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=itemName">Item name</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=description">Description</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=supplierCode">Supplier</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=cost">Cost</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=price">Price</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=onHand">Number On Hand</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=reorderPoint">Reorder level</a></div>
		<div class="grid-item g-header"><a href = "view.php?sorting=backOrder">On Back Order?</a></div>
		<div class="grid-item g-header"><!--a href = "view.php?sorting=deleted">Delete</a-->Delete</div>
		<?php
		if(!$successful):?>
			<div class = "popup"><h2>No result found</h2></div>
		<?php unset($_SESSION['search_text']); endif;
		while($row = mysqli_fetch_assoc($result))
		{
		?>
			<div class="grid-item g-content"><a href = "add.php?mod=<?php echo $row['id'];?>"><?php echo $row['id'];?></a></div>
			<div class="grid-item g-content"><?php echo $row['itemName']; ?></div>
			<div class="grid-item g-content"><?php echo $row['description']; ?></div>
			<div class="grid-item g-content"><?php echo $row['supplierCode']; ?></div>
			<div class="grid-item g-content"><?php echo $row['cost']; ?></div>
			<div class="grid-item g-content"><?php echo $row['price']; ?></div>
			<div class="grid-item g-content"><?php echo $row['onHand']; ?></div>
			<div class="grid-item g-content"><?php echo $row['reorderPoint']; ?></div>
			<div class="grid-item g-content"><?php echo $row['backOrder']; ?></div>
			<div class="grid-item g-content"><a href = "delete.php?id=<?php echo $row['id'];?>">
			<?php if ($row['deleted'] == 'n'){echo "Delete";} ?>			  
			</a></div>
		<?php
		}
		?>
	</div>
			</div>
			</div>
			<?php $menu->footer();?>
	</body>
</html>			
<?php
$dabase->close();
}
else
{
	header('Location: index.php');//if an user didn't log in, go back to log in page.
}
?>
