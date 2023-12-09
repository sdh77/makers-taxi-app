<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$deleteChatId = $_POST['deleteId'];
$findChatSql = "select * from chatlist where chatid = " . $deleteChatId;
$chatDatas = pg_query($conn, $findChatSql);
if ($chatDatas) {
  if (pg_num_rows($chatDatas) > 0) {
    while ($chatData = pg_fetch_array($chatDatas)) {
      if ($chatData['defaultnum'] == 1) {
        $deleteChatSql = "delete from chatlist where chatid = " . $deleteChatId;
        pg_query($conn, $deleteChatSql);
      } else {
        echo "No";
      }
    }
  }
}
pg_close($conn);
?>