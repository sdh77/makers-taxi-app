/* chat.js */
"use strict";

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
const displayContainer = document.querySelector(".display-container"); // displayContainer 추가

// 서버로부터 LiModel을 받아오기
socket.on("getLiModel", (receivedLiModel) => {
  liModelInstance = new LiModel(
    receivedLiModel.name,
    receivedLiModel.msg,
    receivedLiModel.time
  );

  // LiModel을 받아왔으면 이제 채팅 메시지를 받을 수 있도록 리스너 등록
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
  };
  socket.emit("chatting", param);
});

function appendChatMessage(data) {
  if (!liModelInstance) {
    console.error("LiModel is not defined");
    return;
  }

  // LiModel 클래스를 사용하여 객체 생성
  const liModel = new LiModel(data.name, data.msg, data.time);
  liModel.makeLi();
  scrollToBottom();
}

function scrollToBottom() {
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
}
