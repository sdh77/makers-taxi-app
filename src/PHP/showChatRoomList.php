<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$selectValue = $_POST['selectValue_chatPage'];
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
        <div class="chatList-header">
          <p>Chat</p>
          <select class="chatList-goalArea" onchange="selectChatPage()">';
if ($selectValue == "전체")
  echo '<option value="전체">전체</option>
            <option value="대신관">대신관</option>
            <option value="수리관">수리관</option>
            <option value="운동장">운동장</option>';
else if ($selectValue == "대신관")
  echo '<option value="전체">전체</option>
            <option value="대신관" selected>대신관</option>
            <option value="수리관">수리관</option>
            <option value="운동장">운동장</option>';
else if ($selectValue == "수리관")
  echo '<option value="전체">전체</option>
            <option value="대신관">대신관</option>
            <option value="수리관" selected>수리관</option>
            <option value="운동장">운동장</option>';
else if ($selectValue == "운동장")
  echo '<option value="전체">전체</option>
            <option value="대신관">대신관</option>
            <option value="수리관">수리관</option>
            <option value="운동장" selected>운동장</option>';

echo '</select>
        </div>
        <div class="functionBtn">
          <button class="functionBtn_enterFirstRoom"><i class="fa-solid fa-bolt"></i></button>
          <button class="functionBtn_reload"><i class="fa-solid fa-rotate"></i></button>
          <button class="functionBtn_plus"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>';
echo '<div class="main-middle">';
if ($selectValue == "전체") {
  $chatListSql = "select * from chatlist where state = false order by endtime ,chatid";
} else {
  $chatListSql = "select * from chatlist where state = false and goalarea = '" . $selectValue . "' order by endtime ,chatid";
}
$chatLists = pg_query($conn, $chatListSql);
if ($chatLists) {
  if (pg_num_rows($chatLists) > 0) {
    while ($chatList = pg_fetch_array($chatLists)) {
      echo "<div class='chatList ";
      if ($chatList["state"] == "t")
        echo "recruitmentCompleted";
      echo "'>
                <div class='row chatList-row'>
                  <div class='row chatList-timeTitle'>
                    <p>" . $chatList["endtime"] . "</p>
                <!--<p>" . $chatList['chattitle'] . "</p>-->
                    <p class='chatList-chatid'>" . $chatList['chatid'] . "</p>
                  </div>";
      if ($chatList["state"] == "t") {
        if (in_array($chatList['chatid'], $myLikeChatLists))
          echo "<button class='chatList-deleteLikeBtnRecruitmentCompleted'><i class='fa-solid fa-heart'></i></button>";
        else
          echo "<button class='chatList-LikeBtnRecruitmentCompleted'><i class='fa-solid fa-heart'></i></button>";

      } else {
        if (in_array($chatList['chatid'], $myLikeChatLists))
          echo "<button class='chatList-deleteLikeBtn'><i class='fa-solid fa-heart'></i></button>";
        else
          echo "<button class='chatList-LikeBtn'><i class='fa-solid fa-heart'></i></button>";
      }
      echo "</div>
                <div class='row chatList-row'>
                  <div class='row'>
                    <p>" . $chatList['startarea'] . "&nbsp;</p>
                    <i class='fa-solid fa-arrow-right'></i>
                    <p>&nbsp;" . $chatList['goalarea'] . "</p>
                  </div>
                  <div class='row'>
                    <p class='chatList-nowMember'>" . $chatList['defaultnum'] . "</p>
                    <p>/</p>
                    <p class='chatList-maxMember'>" . $chatList['membernum'] . "</p>
                  </div>
                </div>";
      if ($chatList["state"] == "t")
        echo "<button class='chatList-recruitmentCompleted'>";
      else
        echo "<button class='chatList-Entrance'>";
      echo "입장
          </button>
        </div>";
    }
  }
}
echo "</div>";
pg_close($conn);

?>