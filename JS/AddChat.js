const addChatBtn = document.querySelector(".addChat-Btn");

function submitAddChat() {
  let addChatTitle = document.querySelector(".addChat-RoomTitle input").value;
  const addChatDefaultMemberNum = document.querySelector(
    "#addChat-defaultMemberNum"
  ).value;
  const addChatMemberNum = document.querySelector("#addChat-memberNum").value;
  const addChatStartArea = document.querySelector(".addChat-startArea").value;
  const addChatGoalArea = document.querySelector(".addChat-goalArea").value;
  const addChatEndTime = document.querySelector(".addChat-EndTime").value;
  const timeTxt = document.querySelector(".addChat-EndTime");
  const timeVal = document.querySelector(".addChat-tiemtxt");
  const ErrorTimeTxt = document.querySelector(".time-Error");
  if (addChatEndTime != "") {
    if (addChatTitle == "") {
      addChatTitle = "같이 가요! 👋🏻";
    }
    const addChatData = {
      chatTitle: addChatTitle,
      defaultNum: addChatDefaultMemberNum,
      MemberNum: addChatMemberNum,
      startArea: addChatStartArea,
      goalArea: addChatGoalArea,
      endTime: addChatEndTime,
    };
    timeVal.classList.remove("border-bottom-red");
    timeTxt.classList.remove("border-bottom-red");
    ErrorTimeTxt.classList.remove("Error-visible");
    ErrorTimeTxt.classList.add("Error-hide");

    $.ajax({ url: "PHP/addChatRoom.php", type: "post", data: addChatData });
    addChatForm.classList.add("popup-hide");
    addChatForm.classList.remove("popup-visible");
    setTimeout(updateChatList, 100);
  } else {
    timeVal.classList.add("border-bottom-red");
    timeTxt.classList.add("border-bottom-red");
    ErrorTimeTxt.classList.add("Error-visible");
    ErrorTimeTxt.classList.remove("Error-hide");
  }
}

addChatBtn.addEventListener("click", submitAddChat);
