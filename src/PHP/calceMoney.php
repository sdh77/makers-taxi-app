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
      $userCnt = $count['count'] + 1;
    }
  }
}
$updateCostSql = "update taxi_userinfo set settlement = " . round($taxiFare / $userCnt) . " where chatid = " . $chatId . " and id not in(select maker from chatlist where chatid = " . $chatId . ")";

pg_query($conn, $updateCostSql);
echo round($taxiFare / $userCnt);

pg_close($conn);

?>