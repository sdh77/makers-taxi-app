const signUp = document.querySelector(".signUpbtn");

function handleSignUpSubmit(event) {
    event.preventDefault();
    const setName = document.querySelector(".setName");
    const setID = document.querySelector(".setID");
    const setAccount = document.querySelector(".setaccount");
    const setNickname = document.querySelector(".setNickname");
    const setPhone = document.querySelector(".setphone");
    const loginId = document.querySelector(".loginId");
    const loginPwd = document.querySelector(".loginPwd");

    const setObj = {
        name: setName.value,
        id: setID.value,
        account: setAccount.value,
        nickname: setNickname.value,
        phone: setPhone.value,
        loginid: loginId.value,
        loginpwd: loginPwd.value
    };
    
    console.log(setObj);
    $.ajax({url: "PHP/signUp.php", type: "get", data: setObj});
    
}

signUp.addEventListener("click", handleSignUpSubmit);
