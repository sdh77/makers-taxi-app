<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
date_default_timezone_set('Asia/Seoul');

$chatId = $_POST['chatId'];
$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$messageDataSql = "select * from chats where chatid = " . $chatId;
$searchNoShowSql = "select * from taxi_userinfo where id = '" . $_SESSION['id'] . "'";
$messageDatas = pg_query($conn, $messageDataSql);
$chatDatas = pg_query($conn, $searchChatSql);
$noShowDatas = pg_query($conn, $searchNoShowSql);

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
            <div class="chatRoom-makerId hide">' . $chatData['maker'] . '</div>';
        if ($noShowDatas) {
          if (pg_num_rows($noShowDatas) > 0) {
            while ($noShowData = pg_fetch_array($noShowDatas)) {
              if ($noShowData['settlement'] == 0)
                echo '<button class="chatOutBtn chatting-outBtn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>';
              else
                echo '<button class="chatOutBtn chatting-outBtnError"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>';
            }
          }
        }
        echo '</div>
          <div class="display-container">
            <ul class="chatting-list">';
        if ($messageDatas) {
          if (pg_num_rows($messageDatas) > 0) {
            while ($messageData = pg_fetch_array($messageDatas)) {
              if ($messageData['id'] == "system") {
                echo "<li class='takeTaxi'><span class='message'>탑승이 완료되었습니다.</span></li>";
              } else if ($messageData['id'] == "systemMoney") {
                $moneyData = explode(',', $messageData['msg']);
                echo '
                <li class="moneyTaxi">
                <div class="moneyDiv">
                <div class="moneyTitle">정산해주세요</div>
                <div class="moneyTotal">결재금액:' . $moneyData[0] . ' </div>
                <div class="moneyDutch">보낼금액:' . $moneyData[1] . '</div>
                <div class="moneyBtns">
                <button class="moneyError">총액이 이상해요</button>
                <button class="moneySend">송금하기</button></div></div>
                </li>';
              } else {
                if ($_SESSION['id'] == $messageData['id']) {
                  $date = date_create($messageData['time']);
                  echo '<li class="sent">
                    <span class="profile">
                    <span class="user">' . $messageData['id'] . '</span>';
                  if (file_exists(('../PROFILE/' . $messageData['id'] . '.jpeg'))) {
                    echo '<img class="image" src="PROFILE/' . $messageData['id'] . '.jpeg" alt="profile" />';
                  } else {
                    echo '<img class="image" src="PROFILE/default.jpeg" alt="profile" />';
                  }
                  echo '</span>
                  <span class="message">' . $messageData['msg'] . '</span>
                  <span class="time">' . date_format($date, "g:i a") . '</span>
                </li>';

                } else {
                  $date = date_create($messageData['time']);
                  echo '<li class="received">
                   <span class="profile">
                  <span class="user">' . $messageData['id'] . '</span>';
                  if (file_exists(('../PROFILE/' . $messageData['id'] . '.jpeg'))) {
                    echo '<img class="image" src="PROFILE/' . $messageData['id'] . '.jpeg" alt="profile" />';
                  } else {
                    echo '<img class="image" src="PROFILE/default.jpeg" alt="profile" />';
                  }
                  echo '</span>
                <span class="message">' . $messageData['msg'] . '</span>
                <span class="time">' . date_format($date, "g:i a") . '</span>
              </li>';
                }
              }
            }
          }
        }
        if ($chatData['maker'] == $_SESSION['id']) {
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
          echo '</ul>
          </div>
          <div class="input-container">
            <span>
              <input type="text" class="chatting-input" />
              <button class="send-button">전송</button>
            </span>
          </div>
        </div>
        ';
        }
      } else {
        echo "채팅방이 가득 입니ㅏㄷ.";
      }
    }
  }
}

?>