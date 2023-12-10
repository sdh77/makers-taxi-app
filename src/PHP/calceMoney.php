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

$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$chatList = pg_query($conn, $searchChatSql);
if ($chatList) {
  if (pg_num_rows($chatList) > 0) {
    while ($chatData = pg_fetch_assoc($chatList)) {
      $useInfoSql = "insert into usetaxiinfo(id,startarea,goalarea,passengersnumber,price,date,maker)
      values('" . $chatData['maker'] . "','" . $chatData['startarea'] . "','" . $chatData['goalarea'] . "'," . $chatData['membernum'] . "," . round($taxiFare / $userCnt) . ",now(), TRUE)";
      pg_query($conn, $useInfoSql);
    }
  }
}

echo round($taxiFare / $userCnt);

pg_close($conn);

?>