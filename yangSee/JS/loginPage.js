const login = document.querySelector(".loginForm_loginBtn");


function handleSignUpSubmit(event){
  event.preventDefault();
  
  const id = document.querySelector(".id");
  const pwd = document.querySelector(".pwd");

  const infoObj = {
    id : id.value,
    pwd : pwd.value
  };

  console.log(infoObj);
  $.ajax({url: "PHP/loginPage.php", type: "get", data: infoObj});

}

login.addEventListener("click", handleSignUpSubmit);