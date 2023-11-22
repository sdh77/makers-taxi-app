function EntranceChat(event) {
  const chatId =
    event.target.parentElement.querySelector(".chatList-chatid").innerHTML;
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
}
