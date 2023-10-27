const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");

const main_middle = document.querySelector(".main-middle");
const main_top = document.querySelector(".main-top p");

showSetting();

function showFriends() {
  // main_middle.innerHTML = "친구창";

  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_middle.innerHTML = data;
  });
  main_top.innerHTML = "Friend";
}

function showChatRoom() {
  // main_middle.innerHTML = "채팅룸";

  $.ajax({ url: "PHP/chatRoom.php", type: "post" }).done(function (data) {
    main_middle.innerHTML = data;
  });
  main_top.innerHTML = "Chats";
}

function showSetting() {
  // main_middle.innerHTML = "설정창";

  $.ajax({ url: "PHP/setting.php", type: "post" }).done(function (data) {
    main_middle.innerHTML = data;
  });
  main_top.innerHTML = "Seatings";
}

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
