<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$friendId = $_POST['friendId'];
$addSql = "insert into friend(id,friendId) values('" . $_SESSION['id'] . "','" . $friendId . "')";
pg_query($conn, $addSql);
pg_close($conn);
?>