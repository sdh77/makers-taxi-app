const submitBtn = document.querySelector(".loginForm_loginBtn");
const loginDefaultCheck = document.querySelector(".loginForm_autocheck__check");
function checkDefault(event) {
  if (loginDefaultCheck.checked == true) {
    const inputId = document.querySelector(".inputId").value;
    const inputPwd = document.querySelector(".inputpwd").value;
    localStorage.setItem("id", inputId);
    localStorage.setItem("pwd", inputPwd);
  }
}
function checkLocalStorage() {
  const saveId = localStorage.getItem("id");
  const savePwd = localStorage.getItem("pwd");
  if (saveId != null && savePwd != null) {
    document.querySelector(".inputId").value = saveId;
    document.querySelector(".inputpwd").value = savePwd;
    document.querySelector(".loginForm_autocheck__check").checked = true;
  }
}
window.onload = checkLocalStorage;
submitBtn.addEventListener("click", checkDefault);
