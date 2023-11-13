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
        <i class="fa-solid fa-user-group click"></i>
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
          <form class="popupRow plusFriend-row">
            <input class="plusFriend-id" type="text" placeholder="친구의 아이디를 입력하시오" name="friendId"/>
            <button class="submitAddFriend" type="submit" onclick="AddFriend(event)">검색</button>
          </form>
          <div class="popupRow plusFriend-row">
            <div>나의 아이디</div>
            <div class="my-id">' . $_SESSION['id'] . '</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="bellFriendForm" class="popup">
    <div id="modalContent">
      <div id="bellFriendBody">
        <div class="bellFriend">
        
        </div>
      </div>
    </div>
    <div class="bellFriendFrom-closeUp">
      <img src="IMG/위쪽.png" alt="닫기"></img>
    </div>
  </div>

  <div id="addChatForm" class="popup">
    <div id="modalContent">
      <div id="addChatBody">
        <div class="addChat">
          <div class="popupHeader">
            <p>방 만들기</p>
          </div>
          <button class="addChat-Btn">확인</button>
          <div class="popupRow addChat-row addChat-RoomTitle">
            <input type="text"></input>
            <select id="addChat-defaultMemberNum">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <div class="textCenter">/</div>
            <select id="addChat-memberNum">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4" selected>4</option>
            </select>
          </div>
          <div class="popupRow addChat-row">
            <div class="textCenter addChat-option">출발지</div>
            <select class="addChat-startArea">
              <option value="안양역">안양역</option>
              <option value="명학역">명학역</option>
            </select>
          </div>
          <div class="popupRow addChat-row">
            <div class="textCenter addChat-option">도착지</div>
            <select class="addChat-goalArea">
              <option value="대신관">대신관</option>
              <option value="수리관">수리관</option>
              <option value="운동장">운동장</option>
            </select>
          </div>
          <div class="popupRow addChat-row">
            <div class="textCenter addChat-option">모집 시간</div>
            <input class="addChat-EndTime" type="time">
          </div>
        </div>
      </div>
    </div>
    <div class="addChatForm-closeUp">
      <img src="IMG/위쪽.png" alt="닫기"></img>
    </div>
  </div>

</div>
<div class="hideMy-id">' . $_SESSION['id'] . '</div>

  <script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="JS/mainPage.js"></script>
  <script src="JS/AddFriend.js"></script>
  <script src="JS/AddChat.js"></script>
  
</body>

</html>';
} else {
  echo "로그인을 해주세요";
}
?>