const moneyBtnAll = document.querySelector(".sendMoneyBody-allMoney");
const moneyBtn50000 = document.querySelector(".sendMoneyBody-50000");
const moneyBtn10000 = document.querySelector(".sendMoneyBody-10000");
const moneyInput = document.querySelector(".sendMoneyBody-inputMoney");
const sendMoneyBtn = document.querySelector(".sendMoneyBody-sendBtn");
const overErrorTxt = document.querySelector(".Over-Error");
const zeroErrorTxt = document.querySelector(".Zero-Error");

function moneyAll() {
  const nowAllMoney = Number(
    document
      .querySelector(".setArea-myMoney__money")
      .innerHTML.replace("원", "")
  );
  moneyInput.value = nowAllMoney;
}

function money50000() {
  console.log("Asd");
  const nowInputValue = Number(moneyInput.value);
  moneyInput.value = nowInputValue + 50000;
}

function money10000() {
  const nowInputValue = Number(moneyInput.value);
  moneyInput.value = nowInputValue + 10000;
}
function sendMoney() {
  const nowAllMoney = document.querySelector(
    ".setArea-myMoney__money"
  ).innerHTML;

  if (Number(moneyInput.value) == 0) {
    overErrorTxt.classList.remove("Error-visible");
    overErrorTxt.classList.add("Error-hide");
    zeroErrorTxt.classList.add("Error-visible");
    zeroErrorTxt.classList.remove("Error-hide");
  } else if (nowAllMoney >= Number(moneyInput.value)) {
    const sendMoneyData = {
      myId: myId,
      sendMoney: Number(moneyInput.value),
    };
    $.ajax({
      url: "PHP/sendMoney.php",
      type: "post",
      data: sendMoneyData,
    });
    moneyInput.value = "";
    zeroErrorTxt.classList.remove("Error-visible");
    zeroErrorTxt.classList.add("Error-hide");
    overErrorTxt.classList.remove("Error-visible");
    overErrorTxt.classList.add("Error-hide");
    sendMoneyForm.classList.add("popup-hide");
    sendMoneyForm.classList.remove("popup-visible");
    setTimeout(showSetting, 100);
  } else {
    zeroErrorTxt.classList.remove("Error-visible");
    zeroErrorTxt.classList.add("Error-hide");
    overErrorTxt.classList.add("Error-visible");
    overErrorTxt.classList.remove("Error-hide");
  }
}
moneyBtnAll.addEventListener("click", moneyAll);
moneyBtn50000.addEventListener("click", money50000);
moneyBtn10000.addEventListener("click", money10000);
sendMoneyBtn.addEventListener("click", sendMoney);
