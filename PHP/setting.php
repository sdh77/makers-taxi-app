<?php
session_start();
echo '<div class="profile">
        <div class="profile__column profile">
          <img src="PROFILE/image.jpeg" />
          <h2>'.$_SESSION["id"].'</h2>
        </div>
        <div class="profile__column">
          <span class="icon">❤️‍🔥</span>
          <span>9999!! </span>
        </div>
      </div>'
?>