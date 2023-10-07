import styles from "../CSS/styles.css";

function Login() {
  return (
    <div className="loginForm">
      <div class="row">
        <p>👤</p>
        <input type="text"></input>
      </div>
      <div class="row">
        <p>🔐</p>
        <input type="password"></input>
      </div>
      <button>로그인</button>
    </div>
  );
}

export default Login;
