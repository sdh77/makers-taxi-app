const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const addFriendForm = document.getElementById("addFriendForm");
const addFriendFormInputText = document.querySelector(".plusFriend-id");
const bellFriendForm = document.getElementById("bellFriendForm");
const addChatForm = document.getElementById("addChatForm");
const friendManagementForm = document.getElementById("friendManagementForm");
const bellFormClose = document.querySelector(".bellFriendFrom-closeUp");
const bellFormCloseImg = document.querySelector(".bellFriendFrom-closeUp img");
const addChatFormClose = document.querySelector(".addChatForm-closeUp");
const addChatFormCloseImg = document.querySelector(".addChatForm-closeUp img");
const bellFriendMainText = document.querySelector(".bellFriend");
const addChatMainText = document.querySelector(".addChat");
const friendManagementText = document.querySelector(".friendManagement");
const main_topMiddle = document.querySelector(".main-topMiddle");
const myId = document.querySelector(".hideMy-id").innerHTML;

// showSetting();
showFriends();
addFriendForm.style.display = "none";
bellFriendForm.style.display = "none";
addChatForm.style.display = "none";
friendManagementForm.style.display = "none";
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

    const friends = document.querySelectorAll(".long-click");
    friends.forEach((friend) => {
      friend.addEventListener("mousedown", mouseStart); //pc
      friend.addEventListener("mouseup", mouseEnd); //pc
      friend.addEventListener("touchstart", touchStart, false); //mobile
      friend.addEventListener("touchend", touchEnd, false); //mobile
    });
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
    EntranceBtns = document.querySelectorAll(".chatList-Entrance");
    deleteLikeBtns.forEach((deleteLikeBtn) => {
      deleteLikeBtn.addEventListener("click", deleteLike);
    });
    LikeBtns.forEach((LikeBtn) => {
      LikeBtn.addEventListener("click", Like);
    });
    EntranceBtns.forEach((EntranceBtn) => {
      EntranceBtn.addEventListener("click", EntranceChat);
    });
  });
}

window.onclick = function (event) {
  if (event.target == addFriendForm) {
    addFriendForm.style.display = "none";
  } else if (event.target == friendManagementForm) {
    friendManagementForm.style.display = "none";
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

// [pc] 롱 클릭 이벤트 등록 실시
var pcLong = 0;
function mouseStart() {
  pcLong = Date.now(); //클릭한 시간 얻어옵니다
}
function mouseEnd(evt) {
  var result = Date.now() - pcLong;
  if (Number(result) > 400) {
    //롱 터치 발생
    // alert("LongTouch");
    let friendId;
    if (evt.target.classList[0] == "nickName") {
      friendId = evt.target.innerHTML;
    } else if (evt.target.classList[0] == "profile__column") {
      friendId = evt.target.querySelector(".nickName").innerHTML;
    } else if (evt.target.tagName == "IMG") {
      friendId = evt.target.parentElement.querySelector(".nickName").innerHTML;
    }

    friendManagementForm.style.display = "block";
    const deleteBtn = document.querySelector(".friendManagement-deleteBtn");

    deleteBtn.addEventListener("click", () => {
      const friendDB = {
        friendId: friendId,
        myId: myId,
      };
      $.ajax({
        url: "PHP/showFriendManagement.php",
        type: "post",
        data: friendDB,
      });
      friendManagementForm.style.display = "none";
      setTimeout(updateFriendList, 100);
    });
  }
}
// [mobile] 롱 클릭 이벤트 등록 실시
var mobileLong = 0;
function touchStart(evt) {
  mobileLong = Date.now(); //터치한 시간 얻어옵니다
}
function touchEnd(evt) {
  var result = Date.now() - mobileLong;
  if (Number(result) > 400) {
    //롱 터치 발생
    // alert("LongTouch");
    console.dir(evt.target);
    let friendId;
    if (evt.target.classList[0] == "nickName") {
      friendId = evt.target.innerHTML;
    } else if (evt.target.classList[0] == "profile__column") {
      friendId = evt.target.querySelector(".nickName").innerHTML;
    } else if (evt.target.tagName == "IMG") {
      friendId = evt.target.parentElement.querySelector(".nickName").innerHTML;
    }

    friendManagementForm.style.display = "block";
    const deleteBtn = document.querySelector(".friendManagement-deleteBtn");

    deleteBtn.addEventListener("click", () => {
      const friendDB = {
        friendId: friendId,
        myId: myId,
      };
      $.ajax({
        url: "PHP/showFriendManagement.php",
        type: "post",
        data: friendDB,
      });
      friendManagementForm.style.display = "none";
      setTimeout(updateFriendList, 100);
    });
  }
}

friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
