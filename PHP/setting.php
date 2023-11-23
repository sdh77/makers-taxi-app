<?php
session_start();
echo '<div class="main-top">
        <p>Setting</p>
      </div>';
echo '<div class="main-middle">
        <div class="profile">
          <div class="profile__column profile">';
if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
  echo '<img src="PROFILE/' . $_SESSION['id'] . '.jpeg"/>';
} else {
  echo '<img src="PROFILE/image.jpeg"/>';
}
echo '<h2>' . $_SESSION["id"] . '</h2>
          </div>
          <div class="profile__column">
            <span class="icon">❤️‍🔥</span>
            <span>9999!! </span>
          </div>
        </div>';
echo "<hr>";
echo '<div class="setArea">
         <div class="setArea-money">
          <div>택시비</div>
          <div>0원</div>
        </div>
        <div class="setArea-chargeMoney">충전</div>
        <div class="setArea-sendMoney">송금</div>';
echo '  <div class="setArea-totalMoney">
          택시 사용 금액
        </div>
        <button class="setArea-logout">
          로그아웃
        </button>';
echo '</div>';
?>