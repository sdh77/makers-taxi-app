const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const modal = document.getElementById("modalWrap");
const modalHtml = document.getElementById("modalBody");

const main_topMiddle = document.querySelector(".main-topMiddle");

// showSetting();
showFriends();
modal.style.display = "none";

function showFriends() {
  // main_middle.innerHTML = "친구창";

  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
    dellBtn = document.querySelector(".functionBtn_bell");
    plusBtn = document.querySelector(".functionBtn_plus");

    dellBtn.addEventListener("click", alertList);
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

function alertList() {
  modal.style.display = "block";

  console.log("bell");
}

function friendPlus() {
  modal.style.display = "block";
  $.ajax({ url: "PHP/plusFriendShow.php", type: "post" }).done(function (data) {
    modalHtml.innerHTML = data;
  });
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function NoAction(event) {
  event.preventDefault();
  const plusFriendId = document.querySelector(".plusFriend-id").value;
  console.log(plusFriendBtn);
}

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
