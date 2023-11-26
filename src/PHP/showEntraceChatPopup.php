<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$chatId = $_POST['chatId'];
$searchChatSql = "select * from chatlist where chatid = " . $chatId;

$chatDatas = pg_query($conn, $searchChatSql);
if ($chatDatas) {
  if (pg_num_rows($chatDatas) > 0) {
    while ($chatData = pg_fetch_assoc($chatDatas)) {
      echo '<div class="EntranceRoom-title">' . $chatData['chattitle'] . '</div>
      <div class="row">
       <p>' . $chatData["startarea"] . '&nbsp;</p>
        <i class="fa-solid fa-arrow-right"></i>
        <p>&nbsp;' . $chatData["goalarea"] . '</p>
      </div>
      <div class="EntranceRoom-member">' . $chatData['membernum'] . '명 중 ' . $chatData['defaultnum'] . '명</div>
      <div class="EntranceRoom-meetTime">' . $chatData['endtime'] . ' 집결</div>
      <div class="EntranceRoom-chatId hide">' . $chatId . '</div>
      <button class="EntranceRoom-chat">입장</button>
      ';
    }
  } else {
    echo "방이 삭제 되었습니다.";
  }
}

?>