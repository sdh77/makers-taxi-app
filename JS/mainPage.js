const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const addFriendForm = document.getElementById("addFriendForm");
const addFriendFormInputText = document.querySelector(".plusFriend-id");
const bellFriendForm = document.getElementById("bellFriendForm");
const addChatForm = document.getElementById("addChatForm");
const bellFormClose = document.querySelector(".bellFriendFrom-closeUp");
const bellFormCloseImg = document.querySelector(".bellFriendFrom-closeUp img");
const addChatFormClose = document.querySelector(".addChatForm-closeUp");
const addChatFormCloseImg = document.querySelector(".addChatForm-closeUp img");
const bellFriendMainText = document.querySelector(".bellFriend");
const addChatMainText = document.querySelector(".addChat");
const main_topMiddle = document.querySelector(".main-topMiddle");
const myId = document.querySelector(".hideMy-id").innerHTML;

// showSetting();
showFriends();
addFriendForm.style.display = "none";
bellFriendForm.style.display = "none";
addChatForm.style.display = "none";

function showFriends() {
  // main_middle.innerHTML = "친구창";
  updateFriendList();
  friends.querySelector("i").classList.add("click");
  chatRoom.querySelector("i").classList.remove("click");
  setting.querySelector("i").classList.remove("click");
}

function showChatRoom() {
  updateChatList();
  friends.querySelector("i").classList.remove("click");
  chatRoom.querySelector("i").classList.add("click");
  setting.querySelector("i").classList.remove("click");
}

function showSetting() {
  $.ajax({ url: "PHP/setting.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
  friends.querySelector("i").classList.remove("click");
  chatRoom.querySelector("i").classList.remove("click");
  setting.querySelector("i").classList.add("click");
}

function chatPlus() {
  addChatForm.style.display = "block";
  console.log("plus");
}

function friendPlus() {
  addFriendForm.style.display = "block";
  addFriendFormInputText.focus();
}

function deleteLike(event) {
  const thisChatId = event.target.parentElement.querySelector(
    ".chatList-timeTitle .chatList-chatid"
  ).innerHTML;
  console.log(thisChatId);
  const sendItem = {
    chatId: thisChatId,
    myId: myId,
    action: 0,
  };
  $.ajax({ url: "PHP/alterLikeChat.php", type: "post", data: sendItem });
  setTimeout(updateChatList, 100);
}
function Like(event) {
  const thisChatId = event.target.parentElement.querySelector(
    ".chatList-timeTitle .chatList-chatid"
  ).innerHTML;
  console.log(thisChatId);
  const sendItem = {
    chatId: thisChatId,
    myId: myId,
    action: 1,
  };
  $.ajax({ url: "PHP/alterLikeChat.php", type: "post", data: sendItem });
  setTimeout(updateChatList, 100);
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

function updateChatList() {
  $.ajax({ url: "PHP/chatRoom.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
    plusBtn = document.querySelector(".functionBtn_plus");
    reloadBtn = document.querySelector(".functionBtn_reload");
    plusBtn.addEventListener("click", chatPlus);
    reloadBtn.addEventListener("click", updateChatList);
    deleteLikeBtns = document.querySelectorAll(".chatList-deleteLikeBtn");
    LikeBtns = document.querySelectorAll(".chatList-LikeBtn");
    deleteLikeBtns.forEach((deleteLikeBtn) => {
      deleteLikeBtn.addEventListener("click", deleteLike);
    });
    LikeBtns.forEach((LikeBtn) => {
      LikeBtn.addEventListener("click", Like);
    });
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
  } else if (
    event.target == addChatFormClose ||
    event.target == addChatFormCloseImg
  ) {
    addChatForm.style.display = "none";
  }
};

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
