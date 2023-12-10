const friends = document.querySelector(".friends");
const chatRoom = document.querySelector(".chatroom");
const setting = document.querySelector(".setting");
const addFriendForm = document.getElementById("addFriendForm");
const addFriendFormInputText = document.querySelector(".plusFriend-id");
const bellFriendForm = document.getElementById("bellFriendForm");
const addChatForm = document.getElementById("addChatForm");
const friendManagementForm = document.getElementById("friendManagementForm");
const EntranceChatForm = document.getElementById("EntranceRoomForm");
const chargeMoneyForm = document.getElementById("chargeMoneyForm");
const sendMoneyForm = document.getElementById("sendMoneyForm");
const calculateForm = document.getElementById("CalculateForm");

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
function showFriends() {
  // main_middle.innerHTML = "친구창";
  updateFriendList();
  friends.querySelector("i").classList.add("click");
  chatRoom.querySelector("i").classList.remove("click");
  setting.querySelector("i").classList.remove("click");
}

function showChatRoom() {
  const nowChat = localStorage.getItem("enterRoom");
  if (!nowChat) updateChatList();
  else enterRoom(1);
  friends.querySelector("i").classList.remove("click");
  chatRoom.querySelector("i").classList.add("click");
  setting.querySelector("i").classList.remove("click");
}

function showSetting() {
  $.ajax({ url: "PHP/showSetting.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;

    const logOutBtn = document.querySelector(".setArea-logout");
    const chargeMoneyBtn = document.querySelector(".setArea-chargeMoney");
    const moneyBtns = document.querySelectorAll(".chargeMoney-selectMoney");
    const sendMoneyBtn = document.querySelector(".setArea-sendMoney");
    const noticeBtn = document.querySelector(".setArea-announcement");
    const consumptionAmount = document.querySelector(
      ".setArea-consumptionAmount"
    );
    logOutBtn.addEventListener("click", logOut);
    chargeMoneyBtn.addEventListener("click", showChargeMoneyPopup);
    moneyBtns.forEach(function (moneyBtn) {
      moneyBtn.addEventListener("click", chargeMoney);
    });
    sendMoneyBtn.addEventListener("click", sendMoneyPopup);
    noticeBtn.addEventListener("click", showNotice);
    consumptionAmount.addEventListener("click", showConsumptionAmount);
  });
  friends.querySelector("i").classList.remove("click");
  chatRoom.querySelector("i").classList.remove("click");
  setting.querySelector("i").classList.add("click");
}

function chatPlus() {
  addChatForm.classList.add("popup-visible");
  addChatForm.classList.remove("popup-hide");
  document.querySelector(".addChat-chatName").focus();
  console.log("plus");
}

function friendPlus() {
  addFriendForm.classList.add("popup-visible");
  addFriendForm.classList.remove("popup-hide");
  addFriendFormInputText.focus();
}

function deleteLike(event) {
  const thisChatId = event.target.parentElement.parentElement.querySelector(
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
  const thisChatId = event.target.parentElement.parentElement.querySelector(
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
  $.ajax({ url: "PHP/showFriends.php", type: "post" }).done(function (data) {
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
  const selectList = document.querySelector(".chatList-goalArea");
  let selectValue;
  if (selectList) {
    selectValue = {
      selectValue_chatPage: selectList.value,
    };
  } else {
    selectValue = {
      selectValue_chatPage: "전체",
    };
  }
  $.ajax({
    url: "PHP/showChatRoomList.php",
    type: "post",
    data: selectValue,
  }).done(function (data) {
    main_topMiddle.innerHTML = data;
    const reloadEmoji = document.querySelector(".fa-rotate");
    reloadEmoji.classList.add("fa-spin");

    setTimeout(function () {
      reloadEmoji.classList.remove("fa-spin");
    }, 1000);
    plusBtn = document.querySelector(".functionBtn_plus");
    reloadBtn = document.querySelector(".functionBtn_reload");
    enterFirstRoomBtn = document.querySelector(".functionBtn_enterFirstRoom");
    plusBtn.addEventListener("click", chatPlus);
    reloadBtn.addEventListener("click", updateChatList);
    enterFirstRoomBtn.addEventListener("click", enterFirstRoom);
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
    addFriendForm.classList.add("popup-hide");
    addFriendForm.classList.remove("popup-visible");
  } else if (event.target == friendManagementForm) {
    friendManagementForm.classList.add("popup-hide");
    friendManagementForm.classList.remove("popup-visible");
  } else if (
    event.target == bellFormClose ||
    event.target == bellFormCloseImg
  ) {
    bellFriendForm.classList.add("popup-hide");
    bellFriendForm.classList.remove("popup-visible");
  } else if (
    event.target == addChatFormClose ||
    event.target == addChatFormCloseImg
  ) {
    addChatForm.classList.add("popup-hide");
    addChatForm.classList.remove("popup-visible");
    const timeTxt = document.querySelector(".addChat-EndTime");
    const timeVal = document.querySelector(".addChat-tiemtxt");
    const ErrorTimeTxt = document.querySelector(".time-Error");
    timeVal.classList.remove("border-bottom-red");
    timeTxt.classList.remove("border-bottom-red");
    ErrorTimeTxt.classList.remove("Error-visible");
    ErrorTimeTxt.classList.add("Error-hide");
  } else if (event.target == chargeMoneyForm) {
    chargeMoneyForm.classList.add("popup-hide");
    chargeMoneyForm.classList.remove("popup-visible");
  } else if (event.target == EntranceChatForm) {
    EntranceChatForm.classList.add("popup-hide");
    EntranceChatForm.classList.remove("popup-visible");
  } else if (event.target == sendMoneyForm) {
    sendMoneyForm.classList.add("popup-hide");
    sendMoneyForm.classList.remove("popup-visible");
  } else if (event.target == calculateForm) {
    calculateForm.classList.add("popup-hide");
    calculateForm.classList.remove("popup-visible");
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
    console.dir(evt.target);
    let friendNickName;
    if (evt.target.classList[0] == "nickName") {
      friendNickName = evt.target.innerHTML;
    } else if (evt.target.classList[0] == "friendsProfile") {
      friendNickName = evt.target.querySelector(".nickName").innerHTML;
    } else if (evt.target.tagName == "IMG") {
      friendNickName =
        evt.target.parentElement.querySelector(".nickName").innerHTML;
    }
    console.log(friendNickName);
    const friendNickNameArea = document.querySelector(
      ".friendManagement-friend_name"
    );
    friendNickNameArea.innerHTML = friendNickName;
    friendManagementForm.classList.add("popup-visible");
    friendManagementForm.classList.remove("popup-hide");
    const deleteBtn = document.querySelector(".friendManagement-deleteBtn");

    deleteBtn.addEventListener("click", () => {
      const friendDB = {
        friendNickName: friendNickName,
        myId: myId,
      };
      $.ajax({
        url: "PHP/showFriendManagement.php",
        type: "post",
        data: friendDB,
      });
      friendManagementForm.classList.add("popup-hide");
      friendManagementForm.classList.remove("popup-visible");
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
    let friendNickName;
    if (evt.target.classList[0] == "nickName") {
      friendNickName = evt.target.innerHTML;
    } else if (evt.target.classList[0] == "friendsProfile") {
      friendNickName = evt.target.querySelector(".nickName").innerHTML;
    } else if (evt.target.tagName == "IMG") {
      friendNickName =
        evt.target.parentElement.querySelector(".nickName").innerHTML;
    }

    friendManagementForm.classList.add("popup-visible");
    friendManagementForm.classList.remove("popup-hide");
    const deleteBtn = document.querySelector(".friendManagement-deleteBtn");

    deleteBtn.addEventListener("click", () => {
      const friendDB = {
        friendNickName: friendNickName,
        myId: myId,
      };
      $.ajax({
        url: "PHP/showFriendManagement.php",
        type: "post",
        data: friendDB,
      });
      friendManagementForm.classList.add("popup-hide");
      friendManagementForm.classList.remove("popup-visible");
      setTimeout(updateFriendList, 100);
    });
  }
}

function logOut() {
  $.ajax({
    url: "PHP/logOut.php",
    type: "post",
  });
  localStorage.removeItem("enterRoom");
  window.location.href = "/makers-taxi-app/src";
}
function showChargeMoneyPopup() {
  chargeMoneyForm.classList.remove("popup-hide");
  chargeMoneyForm.classList.add("popup-visible");
}
function chargeMoney(event) {
  console.log(event.target.innerHTML);
  const chargeMoneyData = {
    myId: myId,
    chargeMoney: event.target.innerHTML,
  };
  $.ajax({
    url: "PHP/addMoney.php",
    type: "post",
    data: chargeMoneyData,
  });
  chargeMoneyForm.classList.add("popup-hide");
  chargeMoneyForm.classList.remove("popup-visible");
  setTimeout(showSetting, 100);
}
function sendMoneyPopup() {
  sendMoneyForm.classList.add("popup-visible");
  sendMoneyForm.classList.remove("popup-hide");
  document.querySelector(".sendMoneyBody-inputMoney").focus();
}

function showNotice() {
  $.ajax({ url: "PHP/showNotice.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
    const noticeCloseBtn = document.querySelector(".notice-closeBtn");
    noticeCloseBtn.addEventListener("click", showSetting);
  });
}
function showConsumptionAmount() {
  $.ajax({ url: "PHP/showConsumptionAmount.php", type: "post" }).done(function (
    data
  ) {
    main_topMiddle.innerHTML = data;
    const consumptionAmountCloseBtn = document.querySelector(
      ".consumptionAmount-closeBtn"
    );
    const consumptionAmountMake = document.querySelector(
      ".consumptionAmount-make"
    );
    const consumptionAmountEnter = document.querySelector(
      ".consumptionAmount-enter"
    );
    consumptionAmountCloseBtn.addEventListener("click", showSetting);
    consumptionAmountMake.addEventListener("click", function () {
      consumptionAmountMake.classList.add("consumptionAmount-click");
      consumptionAmountEnter.classList.remove("consumptionAmount-click");
      showUseInfo("maker");
    });
    consumptionAmountEnter.addEventListener("click", function () {
      consumptionAmountEnter.classList.add("consumptionAmount-click");
      consumptionAmountMake.classList.remove("consumptionAmount-click");
      showUseInfo("enter");
    });
  });
  showUseInfo("maker");
}
function enterFirstRoom() {
  updateChatList();
  $.ajax({ url: "PHP/findFirstRoom.php", type: "post" }).done(function (data) {
    if (data == "noChat") {
      alert("대화방이 없습니다. 새로 만들어주세요!");
    } else {
      const chatIds = document.querySelectorAll(".chatList-chatid");
      chatIds.forEach(function (chatId) {
        if (chatId.innerHTML == data) {
          chatId.parentElement.parentElement.parentElement
            .querySelector(".chatList-Entrance")
            .click();
        }
      });
    }
  });
}
function sendMoneyToFriend(event) {
  console.log(event.target.parentElement.querySelector(".nickName"));
}

function selectChatPage() {
  const selectValue_chatPage =
    document.querySelector(".chatList-goalArea").value;
  console.log(selectValue_chatPage);
  updateChatList();
}
function showUseInfo(select) {
  const consumptionAmountText = document.querySelector(
    ".consumptionAmount-data"
  );
  const value = {
    select: select,
  };
  $.ajax({
    url: "PHP/showUseInfo.php",
    type: "post",
    data: value,
  }).done(function (data) {
    consumptionAmountText.innerHTML = data;
  });
}
friends.addEventListener("click", showFriends);
chatRoom.addEventListener("click", showChatRoom);
setting.addEventListener("click", showSetting);
