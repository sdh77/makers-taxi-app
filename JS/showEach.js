const peopleBtn = document.querySelector(".people");
const chatBtn = document.querySelector(".chat");
const setBtn = document.querySelector(".set");
const changePage = document.querySelector(".main-middle");
function showPeople() {
  $.ajax({ url: "PHP/showPeople.php", type: "post" }).done(function (data) {
    changePage.innerHTML = data;
  });
}

function showChat() {
  $.ajax({ url: "PHP/showChat.php", type: "post" }).done(function (data) {
    changePage.innerHTML = data;
  });
}
function showSet() {
  $.ajax({ url: "PHP/showSet.php", type: "post" }).done(function (data) {
    changePage.innerHTML = data;
  });
}

showPeople();

peopleBtn.addEventListener("click", showPeople);
chatBtn.addEventListener("click", showChat);
setBtn.addEventListener("click", showSet);
