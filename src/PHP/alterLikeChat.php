<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$chatId = $_POST['chatId'];
$myId = $_POST['myId'];
$action = $_POST['action'];

if ($action)
  $alterLikeSql = "insert into likechat values ('" . $myId . "'," . $chatId . ")";
else
  $alterLikeSql = "delete from likechat where userid = '" . $myId . "'and chatId = " . $chatId;
pg_query($conn, $alterLikeSql);

pg_close($conn);

?>