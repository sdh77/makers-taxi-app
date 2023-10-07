import { Link } from "react-router-dom";

import styles from "../CSS/styles.css";

function FirstPage() {
  return (
    <div className="firstPage">
      <div className="firstPage_img">
        <img
          className="logo"
          src="https://pimg.designhouse.co.kr/cms/contents/direct/info_id/45267/1220841607201.jpg"
        ></img>
      </div>
      <div className="firstPage_btn">
        <Link to={"/login"}>
          <button className="firstPage_btn__logIn">LogIn</button>
        </Link>
        <Link to={"/singUp"}>
          <button className="firstPage_btn__singUp">SingUp</button>
        </Link>
      </div>
    </div>
  );
}

export default FirstPage;
