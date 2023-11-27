<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$taxiFare = $_POST['taxiFare'];
$chatId = $_POST['chatId'];
$userCnt;
$countChatUserSql = "select count(*) from taxi_userinfo where chatid = " . $chatId;
$countDatas = pg_query($conn, $countChatUserSql);
if ($countDatas) {
  if (pg_num_rows($countDatas) > 0) {
    while ($count = pg_fetch_assoc($countDatas)) {
      $userCnt = $count['count'];
    }
  }
}
echo $taxiFare / $userCnt;
pg_close($conn);

?>