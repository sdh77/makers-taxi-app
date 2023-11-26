function EntranceChat(event) {
  const chatId =
    event.target.parentElement.querySelector(".chatList-chatid").innerHTML;
  const EntranceChatPopup = document.querySelector("#EntranceRoomForm");
  EntranceChatPopup.classList.add("popup-visible");
  EntranceChatPopup.classList.remove("popup-hide");
  const EntraceChatTxt = document.querySelector("#EntranceRoomBody");
  const chatInfo = {
    chatId: chatId,
  };
  $.ajax({
    url: "PHP/showEntraceChatPopup.php",
    type: "post",
    data: chatInfo,
  }).done(function (data) {
    EntraceChatTxt.innerHTML = data;
  });

  /*
  const chatArea = document.querySelector(".main-topMiddle");
  const chatInfo = {
    chatId: chatId,
  };
  console.log(chatInfo);
  $.ajax({ url: "PHP/EntraceChat.php", type: "post", data: chatInfo }).done(
    function (data) {
      chatArea.innerHTML = data;
    }
  );
  */
}
