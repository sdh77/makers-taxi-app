const addChatBtn = document.querySelector(".addChat-Btn");

function submitAddChat() {
  const addChatTitle = document.querySelector(".addChat-RoomTitle input").value;
  const addChatDefaultMemberNum = document.querySelector(
    "#addChat-defaultMemberNum"
  ).value;
  const addChatMemberNum = document.querySelector("#addChat-memberNum").value;
  const addChatStartArea = document.querySelector(".addChat-startArea").value;
  const addChatGoalArea = document.querySelector(".addChat-goalArea").value;
  const addChatEndTime = document.querySelector(".addChat-EndTime").value;
  const addChatData = {
    chatTitle: addChatTitle,
    defaultNum: addChatDefaultMemberNum,
    MemberNum: addChatMemberNum,
    startArea: addChatStartArea,
    goalArea: addChatGoalArea,
    endTime: addChatEndTime,
  };
  $.ajax({ url: "PHP/addChatRoom.php", type: "post", data: addChatData });
  addChatForm.style.display = "none";
  setTimeout(updateChatList, 100);
}

addChatBtn.addEventListener("click", submitAddChat);
