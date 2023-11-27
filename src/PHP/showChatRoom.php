<?php
$chatId = $_POST['chatId'];
echo '
<div class="wrapper">
    <div class="user-container">
      <label for="nickname">대화명</label>
      <input type="text" id="nickname" />
      <div class="chatRoom-chatId hide">' . $chatId . '</div>
    </div>
    <button class="chatting-outBtn">나가기</button>
    <button class="chatting-calculateBtn">정산</button>
    <div class="display-container">
      <ul class="chatting-list">
        <!-- 채팅하나씩 li로 집어 넣을 것 -->
      </ul>
    </div>
    <div class="input-container">
      <span>
        <input type="text" class="chatting-input" />
        <button class="send-button">전송</button>
      </span>
    </div>
  </div>
  ';
?>