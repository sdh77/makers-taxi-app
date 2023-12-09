const EntranceChatPopup = document.querySelector("#EntranceRoomForm");
const sendCalculateBtn = document.querySelector(
  ".CalculateBody-calculateMoney"
);
function EntranceChat(event) {
  const chatId =
    event.target.parentElement.querySelector(".chatList-chatid").innerHTML;
  EntranceChatPopup.classList.add("popup-visible");
  EntranceChatPopup.classList.remove("popup-hide");
  const EntranceChatTxt = document.querySelector("#EntranceRoomBody");
  const chatInfo = {
    chatId: chatId,
  };
  $.ajax({
    url: "PHP/showEntraceChatPopup.php",
    type: "post",
    data: chatInfo,
  }).done(function (data) {
    EntranceChatTxt.innerHTML = data;
    const EntranceChatBtn = document.querySelector(".EntranceRoom-chat");
    const EntranceChatcloseBtn = document.querySelector(
      ".EntranceRoom-closeBtn"
    );

    EntranceChatBtn.addEventListener("click", function () {
      enterRoom(0);
    });
    EntranceChatcloseBtn.addEventListener("click", EntranceRoomClose);
  });
}

// chat.js

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  cors: { origin: "*" },
});

function enterRoom(makeState) {
  let chatId;
  if (!localStorage.getItem("enterRoom")) {
    chatId = document.querySelector(".EntranceRoom-chatId").textContent.trim();
    localStorage.setItem("enterRoom", chatId);
  } else {
    chatId = Number(localStorage.getItem("enterRoom"));
  }
  const chatInfo = {
    chatId: chatId,
  };
  if (!makeState) {
    $.ajax({
      url: "PHP/enterChatRoom.php",
      type: "post",
      data: chatInfo,
    });
  }
  $.ajax({
    url: "PHP/showChatRoom.php",
    type: "post",
    data: chatInfo,
  }).done(function (data) {
    main_topMiddle.innerHTML = data;
    const chatExitBtn = document.querySelector(".chatting-outBtn");
    const chatExitBtnError = document.querySelector(".chatting-outBtnError");
    const calculateBtn = document.querySelector(".chatting-calculateBtn");
    const boardingBtn = document.querySelector(".chatting-boardingBtn");
    const deleteChatBtn = document.querySelector(".chatting-deleteChatBtn");
    if (chatExitBtn) chatExitBtn.addEventListener("click", ExitChat);
    else if (chatExitBtnError)
      chatExitBtnError.addEventListener("click", ExitChatError);
    if (calculateBtn)
      calculateBtn.addEventListener("click", showCalculatePopup);
    if (boardingBtn) boardingBtn.addEventListener("click", saveUser);
    ("use strict");
    if (deleteChatBtn) deleteChatBtn.addEventListener("click", deleteChatRoom);
    // socket.emit("enterRoom", chatId);
    updateSocket(chatId);

    class LiModel {
      constructor(name, msg, time) {
        this.name = name;
        this.msg = msg;
        this.time = time;
      }

      makeLi() {
        const li = document.createElement("li");
        if (this.name == "system") li.classList.add("takeTaxi");
        else if (this.name == "systemMoney") li.classList.add("moneyTaxi");
        else
          li.classList.add(
            nickname.innerHTML === this.name ? "sent" : "received"
          );
        var dom;

        if (this.name == "system") {
          dom = '<span class="message">탑승이 완료되었습니다.</span>';
        } else if (this.name == "systemMoney") {
          const moneyData = this.msg.split(",");
          dom = `<div class="moneyDiv">
                <div class="moneyTitle">정산해요 😆</div>
                <div class="moneyTotal"><p>택시비</p><p>${moneyData[0]}원</p></div>
                <div class="moneyDutch"><p>송금액</p><p class="moneyDutchMoneyTxt">${moneyData[1]}원</p></div>
                <div class="moneyBtns">
                <button class="moneySend">송금하기</button>
                <button class="moneyError">총액이 이상해요</button></div></div>`;
        } else {
          var profile = `./profile/${this.name}.jpeg`;
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", profile, false);
          xhr.send();

          if (xhr.status == "404") {
            dom = `<span class="profile">
          <span class="user">${this.name}</span>
          <img class="image" src="./profile/default.jpeg" alt="any" />
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
          } else {
            dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="./profile/${this.name}.jpeg" alt="any" />
      </span>
      <span class="message">${this.msg}</span>
      <span class="time">${this.time}</span>`;
          }
        }

        li.innerHTML = dom;
        chatList.appendChild(li);
      }
    }

    // const socket = io("http://localhost:3000", {
    //   transports: ["websocket"],
    //   cors: { origin: "*" },
    // });

    function updateSocket(newChatId) {
      socket.disconnect();
      socket.connect({ query: { chatId: newChatId } });

      // 소켓을 다시 연결한 후 "enterRoom" 이벤트를 발생시킵니다.
      socket.emit("enterRoom", Number(newChatId));
      console.log("enterRoom event emitted with chatId:", newChatId);
    }
    console.log(chatId);
    let liModelInstance;
    const displayContainer = document.querySelector(".display-container");

    socket.on("getLiModel", (receivedLiModel) => {
      console.log("Received getLiModel event:", receivedLiModel);
      liModelInstance = new LiModel(
        receivedLiModel.name,
        receivedLiModel.msg,
        receivedLiModel.time
      );

      socket.on("chatting", (data) => {
        appendChatMessage(data);
      });
    });

    const nickname = document.querySelector(".chatRoom-myId");
    const chatList = document.querySelector(".chatting-list");
    const chatInput = document.querySelector(".chatting-input");
    const sendButton = document.querySelector(".send-button");

    sendButton.addEventListener("click", () => {
      const param = {
        name: nickname.innerHTML,
        msg: chatInput.value,
        time: new Date().toLocaleTimeString(),
        chatId: Number(chatId),
      };
      console.log(param);
      if (param.msg != "") socket.emit("chatting", param);
      chatInput.value = "";
    });

    function appendChatMessage(data) {
      if (!liModelInstance) {
        console.error("LiModel is not defined");
        return;
      }
      const liModel = new LiModel(data.name, data.msg, data.time);
      liModel.makeLi();
      scrollToBottom();
    }

    function scrollToBottom() {
      displayContainer.scrollTo(0, displayContainer.scrollHeight);
    }
    scrollToBottom();
  });
  EntranceChatPopup.classList.remove("popup-visible");
  EntranceChatPopup.classList.add("popup-hide");
}

function ExitChat() {
  const chatId = Number(document.querySelector(".chatRoom-chatId").innerHTML);
  console.log(chatId);
  window.localStorage.removeItem("enterRoom");
  const chatInfo = {
    chatId: chatId,
  };

  $.ajax({
    url: "PHP/exitChatRoom.php",
    type: "post",
    data: chatInfo,
  });
  setTimeout(showChatRoom, 100);
}
function showCalculatePopup() {
  calculateForm.classList.add("popup-visible");
  calculateForm.classList.remove("popup-hide");
}

function sendCalculate() {
  setTimeout(function () {
    enterRoom(1);
  }, 100);
  const taxiFare = Number(
    document.querySelector(".CalculateBody-taxiFare").value
  );
  const chatId = Number(document.querySelector(".chatRoom-chatId").innerHTML);

  const fareDate = {
    chatId: chatId,
    taxiFare: taxiFare,
  };
  $.ajax({
    url: "PHP/calceMoney.php",
    type: "post",
    data: fareDate,
  }).done(function (data) {
    const calculateMoney = data;
    console.log(calculateMoney);

    const param = {
      name: "systemMoney",
      msg: taxiFare + "," + calculateMoney,
      time: new Date().toLocaleTimeString(),
      chatId: chatId,
    };

    socket.emit("chatting", param);
    setTimeout(function () {
      enterRoom(1);
    }, 100);
  });
  calculateForm.classList.remove("popup-visible");
  calculateForm.classList.add("popup-hide");
}
function EntranceRoomClose() {
  EntranceChatForm.classList.add("popup-hide");
  EntranceChatForm.classList.remove("popup-visible");
}
function saveUser() {
  const chatId = Number(document.querySelector(".chatRoom-chatId").innerHTML);

  const chatDate = {
    chatId: chatId,
  };
  $.ajax({
    url: "PHP/saveuser.php",
    type: "post",
    data: chatDate,
  });
  const param = {
    name: "system",
    msg: "탑승이 완료되었습니다.",
    time: new Date().toLocaleTimeString(),
    chatId: chatId,
  };

  socket.emit("chatting", param);
  setTimeout(function () {
    enterRoom(1);
  }, 100);
}

function ExitChatError() {
  alert("정산을 해주세요");
}
sendCalculateBtn.addEventListener("click", sendCalculate);
setInterval(() => {
  const findCalc = document.querySelector(".moneyDiv");
  if (findCalc) {
    const sendMoneyBtn = document.querySelector(".moneySend");
    sendMoneyBtn.addEventListener("click", sendMoneyTaxiFare);
  }
}, 1000);
function sendMoneyTaxiFare() {
  const moneyTxt = document.querySelector(".moneyDutchMoneyTxt").innerHTML;
  const sendMoney = Number(moneyTxt.replace("원", ""));
  const sendMoneyData = {
    makerId: document.querySelector(".chatRoom-makerId").innerHTML,
    myId: myId,
    sendMoney: sendMoney,
  };
  $.ajax({
    url: "PHP/sendMoneyTaxiFare.php",
    type: "post",
    data: sendMoneyData,
  }).done(function (data) {
    console.log(data);
    if (data != "complete") {
      alert("송금하지 못했습니다. 잔액을 확인해주세요");
    } else {
      const sendId = {
        myId: myId,
      };
      $.ajax({
        url: "PHP/clearCalculate.php",
        type: "post",
        data: sendId,
      });
      // alert("송금완료했습니다.");
      const nickname = document.querySelector(".chatRoom-myId");
      const chatId = document.querySelector(".chatRoom-chatId").innerHTML;

      const param = {
        name: nickname.innerHTML,
        msg: "송금을 완료했습니다.",
        time: new Date().toLocaleTimeString(),
        chatId: Number(chatId),
      };

      socket.emit("chatting", param);
      // /txt/
      setTimeout(function () {
        enterRoom(1);
      }, 100);
    }
  });
}
function deleteChatRoom() {
  console.log("asd");
  const chatId = {
    deleteId: document.querySelector(".chatRoom-chatId").innerHTML,
  };
  $.ajax({
    url: "PHP/deleteChatRoom.php",
    type: "post",
    data: chatId,
  }).done(function (data) {
    if (data == "No") {
      alert("참여자가 아직 대화방에 있습니다.");
    } else {
      ExitChat();
    }
  });
}
/*
방장 아이디 방장 돈
나의 아이디 나의 돈
송금할 돈
*/
/*
탑승 -> 정보저장 사용자들 ******..

무조건 1/n ***************..

청구 채팅방에 보여주자니 채팅방을 나가면 정보가 사라지고
정보를 저장해뒀으니 다른 페이지에서 보여주는 것도 가능  
정산이 안되면 채팅방을 못나가게 할거냐 ************..
아니면 알람이 계속 오도록 할거냐

12시간 이내에 안보내면 어떻게 할거냐


카카오톡 정산창

정산
금액이 맞는지 투표
-> 정산

*/
