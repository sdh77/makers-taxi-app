const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const addFriendForm = document.getElementById("addFriendForm");
const addFriendFormInputText = document.querySelector(".plusFriend-id");
const bellFriendForm = document.getElementById("bellFriendForm");
const bellFormClose = document.querySelector(".closeUp");
const bellFormCloseImg = document.querySelector(".closeUp img");
const bellFriendMainText = document.querySelector(".bellFriend");
const main_topMiddle = document.querySelector(".main-topMiddle");

// showSetting();
showFriends();
addFriendForm.style.display = "none";
bellFriendForm.style.display = "none";

function showFriends() {
  // main_middle.innerHTML = "친구창";
  updateFriendList();
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

function updateFriendList() {
  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
    bellBtn = document.querySelector(".functionBtn_bell");
    plusBtn = document.querySelector(".functionBtn_plus");

    bellBtn.addEventListener("click", BellList);
    plusBtn.addEventListener("click", friendPlus);
  });
}

window.onclick = function (event) {
  if (event.target == addFriendForm) {
    addFriendForm.style.display = "none";
  } else if (
    event.target == bellFormClose ||
    event.target == bellFormCloseImg
  ) {
    bellFriendForm.style.display = "none";
  }
};

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
