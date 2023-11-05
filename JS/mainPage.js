const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const addFriendForm = document.getElementById("addFriendForm");
const addFriendFormInputText = document.querySelector(".plusFriend-id");
const dellFriendForm = document.getElementById("dellFriendForm");
const dellFormClose = document.querySelector(".closeUp");
const dellFormCloseImg = document.querySelector(".closeUp img");
const bellFriendMainText = document.querySelector(".dellFriend");
const main_topMiddle = document.querySelector(".main-topMiddle");

// showSetting();
showFriends();
addFriendForm.style.display = "none";
dellFriendForm.style.display = "none";

function showFriends() {
  // main_middle.innerHTML = "친구창";

  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
    dellBtn = document.querySelector(".functionBtn_bell");
    plusBtn = document.querySelector(".functionBtn_plus");

    dellBtn.addEventListener("click", BellList);
    plusBtn.addEventListener("click", friendPlus);
  });
}

function showChatRoom() {
  $.ajax({ url: "PHP/chatRoom.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

function showSetting() {
  $.ajax({ url: "PHP/setting.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

function friendPlus() {
  addFriendForm.style.display = "block";
  addFriendFormInputText.focus();
}
window.onclick = function (event) {
  if (event.target == addFriendForm) {
    addFriendForm.style.display = "none";
  } else if (
    event.target == dellFormClose ||
    event.target == dellFormCloseImg
  ) {
    dellFriendForm.style.display = "none";
  }
};

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
