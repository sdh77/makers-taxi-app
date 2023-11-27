<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
date_default_timezone_set('Asia/Seoul');

$chatId = $_POST['chatId'];
$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$messageDataSql = "select * from chats where chatid = " . $chatId;
$messageDatas = pg_query($conn, $messageDataSql);
$chatDatas = pg_query($conn, $searchChatSql);
if ($chatDatas) {
  if (pg_num_rows($chatDatas) > 0) {
    while ($chatData = pg_fetch_array($chatDatas)) {
      if ($chatData['defaultnum'] <= $chatData['membernum']) {
        echo '
      <div class="wrapper">
          <div class="user-container">
            <div>' . $chatData['chattitle'] . '</div>
            <div class="chatRoom-chatId hide">' . $chatId . '</div>
            <div class="chatRoom-myId hide">' . $_SESSION['id'] . '</div>

            <button class="chatting-outBtn">나가기</button>
          </div>
          <div class="display-container">
            <ul class="chatting-list">';
        if ($messageDatas) {
          if (pg_num_rows($messageDatas) > 0) {
            while ($messageData = pg_fetch_array($messageDatas)) {
              if ($_SESSION['id'] == $messageData['id']) {
                $date = date_create($messageData['time']);
                echo '<li class="sent">
                    <span class="profile">
                    <span class="user">' . $messageData['id'] . '</span>';
                if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
                  echo '<img class="image" src="PROFILE/' . $_SESSION['id'] . '.jpeg" alt="profile" />';
                } else {
                  echo '<img class="image" src="PROFILE/default.jpeg" alt="profile" />';
                }
                echo '</span>
                  <span class="message">' . $messageData['msg'] . '</span>
                  <span class="time">' . date_format($date, "g:i a") . '</span>
                </li>';

              } else {
                echo '<li class="received">
                   <span class="profile">
                  <span class="user">' . $messageData['id'] . '</span>';
                if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
                  echo '<img class="image" src="PROFILE/' . $_SESSION['id'] . '.jpeg" alt="profile" />';
                } else {
                  echo '<img class="image" src="PROFILE/default.jpeg" alt="profile" />';
                }
                echo '</span>
                <span class="message">' . $messageData['msg'] . '</span>
                <span class="time">' . substr($messageData['time'], 11, 5) . '</span>
              </li>';
              }
            }
          }
        }
        echo '</ul>
          </div>
          <div class="chatting-btns">
          <button class="chatting-boardingBtn">탑승 완료</button>
          <button class="chatting-calculateBtn">정산</button>
          </div>
          <div class="input-container">
            <span>
              <input type="text" class="chatting-input" />
              <button class="send-button">전송</button>
            </span>
          </div>
        </div>
        ';
      } else {
        echo "채팅방이 가득 입니ㅏㄷ.";
      }
    }
  }
}

?>