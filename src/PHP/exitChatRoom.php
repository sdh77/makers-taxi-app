<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
date_default_timezone_set('Asia/Seoul');

$chatId = $_POST['chatId'];
$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$chatDatas = pg_query($conn, $searchChatSql);
if ($chatDatas) {
  if (pg_num_rows($chatDatas) > 0) {
    while ($chatData = pg_fetch_array($chatDatas)) {
      $updateNumSql = "update chatlist set defaultnum =" . ($chatData['defaultnum'] - 1) . " where chatid = " . $chatId;
      pg_query($conn, $updateNumSql);
      $updateUserInfoSql = "update taxi_userinfo set chatid = 0 where id = '" . $_SESSION['id'] . "'";
      pg_query($conn, $updateUserInfoSql);
    }
  }
}

?>