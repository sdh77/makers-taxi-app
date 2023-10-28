const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");

const main_topMiddle = document.querySelector(".main-topMiddle");

showSetting();

function showFriends() {
  // main_middle.innerHTML = "친구창";

  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

function showChatRoom() {
  // main_middle.innerHTML = "채팅룸";

  $.ajax({ url: "PHP/chatRoom.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

function showSetting() {
  // main_middle.innerHTML = "설정창";

  $.ajax({ url: "PHP/setting.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
