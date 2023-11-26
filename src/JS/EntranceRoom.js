const EntranceChatPopup = document.querySelector("#EntranceRoomForm");

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
    EntranceChatBtn.addEventListener("click", enterRoom);
  });
}

// chat.js
function enterRoom() {
  const chatId = document
    .querySelector(".EntranceRoom-chatId")
    .textContent.trim();
  const chatInfo = {
    chatId: chatId,
  };

  $.ajax({
    url: "PHP/showChatRoom.php",
    type: "post",
    data: chatInfo,
  }).done(function (data) {
    main_topMiddle.innerHTML = data;

    ("use strict");

    class LiModel {
      constructor(name, msg, time) {
        this.name = name;
        this.msg = msg;
        this.time = time;
      }

      makeLi() {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = `<span class="profile">
          <span class="user">${this.name}</span>
          <img class="image" src="https://placeimg.com/50/50/any" alt="any" />
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
      }
    }

    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      cors: { origin: "*" },
    });

    let liModelInstance;
    const displayContainer = document.querySelector(".display-container");

    socket.on("getLiModel", (receivedLiModel) => {
      liModelInstance = new LiModel(
        receivedLiModel.name,
        receivedLiModel.msg,
        receivedLiModel.time
      );

      socket.on("chatting", (data) => {
        appendChatMessage(data);
      });
    });

    const nickname = document.querySelector("#nickname");
    const chatList = document.querySelector(".chatting-list");
    const chatInput = document.querySelector(".chatting-input");
    const sendButton = document.querySelector(".send-button");

    sendButton.addEventListener("click", () => {
      const param = {
        name: nickname.value,
        msg: chatInput.value,
        time: new Date().toLocaleTimeString(),
        chatId: Number(chatId),
      };
      console.log(param);
      socket.emit("chatting", param);
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
  });
  EntranceChatPopup.classList.remove("popup-visible");
  EntranceChatPopup.classList.add("popup-hide");
}
