<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$friendId = $_POST['friendId'];
$myId = $_POST['myId'];

$deleteFriendSql = "delete from friend where id = '" . $myId . "' and friendid = '" . $friendId . "'";
pg_query($conn, $deleteFriendSql);

pg_close($conn);
?>