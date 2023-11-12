<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$chatTitle = $_POST['chatTitle'];
$defaultNum = $_POST['defaultNum'];
$memberNum = $_POST['MemberNum'];
$startArea = $_POST['startArea'];
$goalArea = $_POST['goalArea'];
$endTime = $_POST['endTime'];
echo $chatTitle;
echo $defaultNum;
echo $memberNum;
echo $startArea;
echo $goalArea;
echo $endTime;

$insertChatList = "insert into chatList(chattitle,defaultnum,membernum,startarea,goalarea,endtime)
values ('" . $chatTitle . "'," . $defaultNum . "," . $memberNum . ",'" . $startArea . "','" . $goalArea . "','" . $endTime . "')";
pg_query($conn, $insertChatList);

?>