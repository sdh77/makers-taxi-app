const my_id = document.querySelector(".my-id").innerHTML;

function BellList() {
  dellFriendForm.style.display = "block";
  console.log("bell");
  $.ajax({ url: "PHP/dellFriendList.php", type: "post" }).done(function (data) {
    bellFriendMainText.innerHTML = data;
    const friendAddBtns = document.querySelectorAll(".bellFriend-add__btn");
    friendAddBtns.forEach((friendAddBtn) =>
      friendAddBtn.addEventListener("click", allowFriend)
    );
  });
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
  $.ajax({ url: "PHP/plusFriend.php", type: "post", data: addFriendObj });
  updateFriendList();
  updateBellList();
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
    $.ajax({ url: "PHP/plusFriend.php", type: "post", data: addFriendObj });
    plusFriendId.value = "";
    updateFriendList();
  }
}

function updateFriendList() {
  $.ajax({ url: "PHP/friends.php", type: "post" }).done(function (data) {
    main_topMiddle.innerHTML = data;
  });
}

function updateBellList() {
  $.ajax({ url: "PHP/dellFriendList.php", type: "post" }).done(function (data) {
    bellFriendMainText.innerHTML = data;
  });
}
