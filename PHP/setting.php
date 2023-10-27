<?php
session_start();
echo '<div class="profile">
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
      </div>'
  ?>