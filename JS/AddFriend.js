const my_id = document.querySelector(".my-id").innerHTML;

function BellList() {
  bellFriendForm.classList.add("popup-visible");
  bellFriendForm.classList.remove("popup-hide");
  console.log("bell");
  updateBellList();
}

function allowFriend(event) {
  const friendName =
    event.target.parentElement.parentElement.querySelector(
      ".bellFriend-name"
    ).innerHTML;
  console.log(friendName);
  console.log(my_id);
  const addFriendObj = {
    friendName: friendName,
    myId: my_id,
  };
  $.ajax({ url: "PHP/addFriend.php", type: "post", data: addFriendObj });
  setTimeout(updateFriendList, 100);
  setTimeout(updateBellList, 100);
}

function AddFriend(event) {
  event.preventDefault();
  const plusFriendId = document.querySelector(".plusFriend-id");
  console.log(plusFriendId);
  console.log(my_id);
  if (plusFriendId.value != "") {
    const addFriendObj = {
      friendId: plusFriendId.value,
      myId: my_id,
    };
    $.ajax({
      url: "PHP/addFriend.php",
      type: "post",
      data: addFriendObj,
    }).done(function (data) {});
    plusFriendId.value = "";
    setTimeout(updateFriendList, 100);
  }
}

function updateBellList() {
  $.ajax({ url: "PHP/bellFriendList.php", type: "post" }).done(function (data) {
    bellFriendMainText.innerHTML = data;
    const friendAddBtns = document.querySelectorAll(".bellFriend-add__btn");
    friendAddBtns.forEach((friendAddBtn) =>
      friendAddBtn.addEventListener("click", allowFriend)
    );
  });
}
