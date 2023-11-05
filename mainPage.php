<?php
session_start();
if (isset($_SESSION["id"])) {
  echo '<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>기능 화면</title>
  <link rel="stylesheet" href="CSS/styles.css" />
</head>

<body>
  <div class="main-topMiddle"></div>
  <div class="main-bottom">
    <div>
      <button class="friends">
        <i class="fa-solid fa-user-group"></i>
      </button>
    </div>
    <div>
      <button class="chatroom">
        <i class="fa-regular fa-comment"></i>
      </button>
    </div>
    <div>
      <button class="setting">
        <i class="fa-solid fa-gear"></i>
      </button>
    </div>
  </div>

  <div id="addFriendForm" class="popup">
    <div id="modalContent">
      <div id="addFriendBody">
        <div class="plusFriend">
          <div class="popupHeader">add</div>
          <form class="plusFriend-row">
            <input class="plusFriend-id" type="text" placeholder="친구의 아이디를 입력하시오" name="friendId"/>
            <button class="submitAddFriend" type="submit" onclick="AddFriend(event)">검색</button>
          </form>
          <div class="plusFriend-row">
            <div>나의 아이디</div>
            <div class="my-id">' . $_SESSION['id'] . '</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="dellFriendForm" class="popup">
    <div id="modalContent">
      <div id="dellFriendBody">
        <div class="dellFriend">
        
        </div>
      </div>
    </div>
    <div class="closeUp">
      <img src="IMG/위쪽.png" alt="닫기"></img>
    </div>
  </div>
</div>

  <script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="JS/mainPage.js"></script>
  <script src="JS/AddFriend.js"></script>
  <script src="JS/bellFriend.js"></script>
  
</body>

</html>';
} else {
  echo "로그인을 해주세요";
}
?>