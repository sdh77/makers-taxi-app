import styles from "../CSS/styles.css";
import { Link } from "react-router-dom";

let DB = {};
function SingUpPage() {
  function setJson() {
    console.log(DB);
    const inputs = document.querySelectorAll("input");
    const idInput = document.querySelector(".loginId");
    const name = document.querySelector(".setName").value;
    const studentId = document.querySelector(".setID").value;
    const accountNum = document.querySelector(".setaccount").value;
    const nickName = document.querySelector(".setnickName").value;
    const phoneNumber = document.querySelector(".setphone").value;
    const id = document.querySelector(".loginId").value;
    const pwd = document.querySelector(".loginPwd").value;
    // if (id in DB.keys) {
    //   alert("아이디가 중복됩니다.");
    // }
    let state = 1;
    console.log(Object.keys(DB));
    for (let checkId of Object.keys(DB)) {
      if (id === checkId) {
        alert("아이디가 중복 됩니다.");
        state = 0;
      }
    }
    if (state === 1) {
      console.log("asdasdasd");
      const obj = {
        name: name,
        studentId: studentId,
        accountNum: accountNum,
        nickName: nickName,
        phoneNumber: phoneNumber,
        id: id,
        pwd: pwd,
      };
      const json = JSON.stringify(obj);
      console.log(json);
      DB[id] = json;
      inputs.forEach(function (input) {
        input.value = "";
      });
      Home();
    } else {
      idInput.value = "";
    }
  }
  function Home() {
    window.location.replace("/");
  }
  return (
    <div className="inputInfo">
      <button onClick={Home}>‹</button>
      <div class="inputInfo_header">회원 가입</div>
      <p>이름</p>
      <input className="setName" type="text" name="name" autoFocus></input>
      <p>학번</p>
      <input className="setID" type="text"></input>
      <p>계좌 번호</p>
      <input className="setaccount" type="text"></input>
      <p>별명</p>
      <input className="setnickName" type="text"></input>
      <p>전화번호</p>
      <input className="setphone" type="text"></input>
      <p>아이디</p>
      <input className="loginId" type="text"></input>
      <p>비밀번호</p>
      <input className="loginPwd" type="text"></input>
      <button onClick={setJson}>회원가입</button>
    </div>
  );
}

export default SingUpPage;
