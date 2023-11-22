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
echo '   <div>
          <div>택시비</div>
          <div>0원</div>
          <div>충전</div>
          <div>송금</div>
        </div>';
echo '   <div>
          택시 사용 금액
        </div>
        <div>
          로그아웃
        </div>';


echo '</div>';
?>