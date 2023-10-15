const signUp = document.querySelector(".signUpbtn");

function handleSignUpSubmit(event) {
    event.preventDefault();
    const setName = document.querySelector("setName");
    const setID = document.querySelector("setID");
    const setAccount = document.querySelector("setaccount");
    const setNickname = document.querySelector("setNickname");
    const setPhone = document.querySelector("setphone");
    const loginId = document.querySelector("loginId");
    const loginPwd = document.querySelector("loginPwd");

    const setObj = {
        name: setName,
        id: setID,
        account: setAccount,
        nickname: setNickname,
        phone: setPhone,
        loginid: loginId,
        loginpwd: loginPwd
    }
    $.ajax({URL: "../PHP/signUp.php", type: "get", data: setObj});
    
}

signUp.addEventListener("submit", handleSignUpSubmit);
