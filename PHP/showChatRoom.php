<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$myLikeChatLists = [];
$likeChatSql = "select * from likechat where userid = '" . $_SESSION['id'] . "'";
$likeChatLists = pg_query($conn, $likeChatSql);
if ($likeChatLists) {
  if (pg_num_rows($likeChatLists) > 0) {
    while ($likeChatList = pg_fetch_array($likeChatLists)) {
      $myLikeChatLists[] = $likeChatList['chatid'];
    }
  } else
    $myLikeChatLists[0] = "none";
}

echo '<div class="main-top">
        <p>Chat</p>
        <div class="functionBtn">
          <button class="functionBtn_reload"><i class="fa-solid fa-rotate"></i></button>
          <button class="functionBtn_plus"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>';
echo '<div class="main-middle">';
$chatListSql = "select * from chatlist";
$chatLists = pg_query($conn, $chatListSql);
if ($chatLists) {
  if (pg_num_rows($chatLists) > 0) {
    while ($chatList = pg_fetch_array($chatLists)) {
      echo "<div class='chatList'>
                <div class='row chatList-row'>
                  <div class='row chatList-timeTitle'>
                    <p>" . $chatList["endtime"] . "</p>
                <!--<p>" . $chatList['chattitle'] . "</p>-->
                    <p class='chatList-chatid'>" . $chatList['chatid'] . "</p>
                  </div>";
      if (in_array($chatList['chatid'], $myLikeChatLists))
        echo "<button class='chatList-deleteLikeBtn'><i class='fa-solid fa-heart'></i></button>";
      else
        echo "<button class='chatList-LikeBtn'><i class='fa-solid fa-heart'></i></button>";
      echo "</div>
                <div class='row chatList-row'>
                  <div class='row'>
                    <p>" . $chatList['startarea'] . "&nbsp;</p>
                    <i class='fa-solid fa-arrow-right'></i>
                    <p>&nbsp;" . $chatList['goalarea'] . "</p>
                  </div>
                  <div class='row'>
                    <p>" . $chatList['defaultnum'] . "</p>
                    <p>/</p>
                    <p>" . $chatList['membernum'] . "</p>
                  </div>
                </div>
                <button class='chatList-Entrance'>
                  <p>입장</p>
                </button>
            </div>";
    }
  }
}
echo "</div>";
pg_close($conn);

?>