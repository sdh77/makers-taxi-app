<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$myId = $_POST['myId'];
$clearSql = "update taxi_userinfo set settlement = 0 where id = '" . $myId . "'";
pg_query($conn, $clearSql);
pg_close($conn);

?>