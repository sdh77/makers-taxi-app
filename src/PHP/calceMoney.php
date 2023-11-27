<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$taxiFare = $_POST['taxiFare'];
$chatId = $_POST['chatId'];

// $searchMemberNumSql = "select * from chatlist where "
?>