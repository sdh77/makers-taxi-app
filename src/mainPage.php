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
        <i class="fa-solid fa-comment"></i>
      </button>
    </div>
    <div>
      <button class="setting">
        <i class="fa-solid fa-gear"></i>
      </button>
    </div>
  </div>

  <div id="addFriendForm" class="popup popup-hide">
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

  <div id="bellFriendForm" class="popup popup-hide">
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

  <div id="addChatForm" class="popup popup-hide">
    <div id="modalContent">
      <div id="addChatBody">
        <div class="addChat">
          <div class="popupHeader">
            <p>방 만들기</p>
          </div>
          <button class="addChat-Btn">확인</button>
          <div class="popupRow addChat-row addChat-RoomTitle">
            <input type="text" class="addChat-chatName" placeholder="같이 가요! 👋🏻"></input>
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
            <div class="textCenter addChat-option addChat-tiemtxt">모집 시간</div>
            <input class="addChat-EndTime" type="time" required>
            <div class="time-Error Error-txt Error-hide"><p>시간을 입력해 주세요!</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="addChatForm-closeUp">
      <img src="IMG/위쪽.png" alt="닫기"></img>
    </div>
  </div>


  <div id="friendManagementForm" class="popup popup-hide">
    <div id="modalContent">
      <div id="friendManagementBody">
        <div class="friendManagement">
          <div class="friendManagement-friend_name">친구 이름</div>
          <button class="friendManagement-deleteBtn">친구 삭제</button>
        </div>
      </div>
    </div>
  </div>
  <div id="chargeMoneyForm" class="popup popup-hide">
    <div id="modalContent">
      <div id="chargeMoneyBody">
        <div class="chargeMoneyBody-header">얼마나 층전할까요?</div>
        <hr>
        
        <div class="chargeMoney">
          <button class="chargeMoney-selectMoney">100000원</button>
          <button class="chargeMoney-selectMoney">50000원</button>
          <button class="chargeMoney-selectMoney">30000원</button>
          <button class="chargeMoney-selectMoney">10000원</button>
          <button class="chargeMoney-selectMoney">5000원</button>
          <button class="chargeMoney-selectMoney">1000원</button>
        </div>
      </div>
    </div>
  </div>

  <div id="sendMoneyForm" class="popup popup-hide">
    <div id="modalContent">
      <div id="sendMoneyBody">
        <div class="sendMoneyBody-header">금액 입력</div>
        <hr>
        <input type="number" class="sendMoneyBody-inputMoney">
        <div class="Over-Error Error-txt Error-hide">입력하신 금액이 보유 잔고보다 많습니다.</div>
        <div class="Zero-Error Error-txt Error-hide">입력하신 금액이 0원 입니다.</div>

        <div class="sendMoneyBody-moneyBtn">
          <button class="sendMoneyBody-allMoney">전부</button>
          <button class="sendMoneyBody-50000">5만원</button>
          <button class="sendMoneyBody-10000">1만원</button>
        </div>
        <button class="sendMoneyBody-sendBtn">보내기</button>
      </div>
    </div>
  </div>

  <div id="EntranceRoomForm" class="popup popup-hide">
    <div id="modalContent">
      <div id="EntranceRoomBody">        
      </div>
    </div>
  </div>

  <div class="hideMy-id">' . $_SESSION['id'] . '</div>

  <script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="JS/EntranceRoom.js"></script>
  <script src="JS/mainPage.js"></script>
  <script src="JS/AddFriend.js"></script>
  <script src="JS/AddChat.js"></script>
  <script src="JS/sendMoney.js"></script>
  <script src="JS/chat.js"></script>
  
  
</body>

</html>';
} else {
  echo "로그인을 해주세요";
}
?>