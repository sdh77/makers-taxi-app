<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$chatTitle = $_POST['chatTitle'];
$defaultNum = $_POST['defaultNum'];
$memberNum = $_POST['MemberNum'];
$startArea = $_POST['startArea'];
$goalArea = $_POST['goalArea'];
$endTime = $_POST['endTime'];
$myId = $_POST['myId'];
$chatId;
$searchLastChatIdSql = "select max(chatid) from chatlist";
$lastChatId = pg_query($conn, $searchLastChatIdSql);
if ($lastChatId) {
  if (pg_num_rows($lastChatId) > 0) {
    while ($row = pg_fetch_assoc($lastChatId)) {
      $chatId = $row['max'] + 1;
    }
  }
}
echo $chatId;
$insertChatList = "insert into chatList(chattitle,defaultnum,membernum,startarea,goalarea,endtime,maker)
values ('" . $chatTitle . "'," . $defaultNum . "," . $memberNum . ",'" . $startArea . "','" . $goalArea . "','" . $endTime . "','" . $myId . "')";
pg_query($conn, $insertChatList);
pg_close($conn);
?>