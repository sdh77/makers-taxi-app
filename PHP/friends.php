<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$sql = "select nickname from taxi_userinfo where id = '" . $_SESSION["id"] . "'";
$result = pg_query($conn, $sql);
echo '<div class="main-top">
        <p>Friends</p>
        <div class="functionBtn">
          <button class="functionBtn_bell"><i class="fa-regular fa-bell"></i></button>
          <button class="functionBtn_plus"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>';
echo '<div class="main-middle">';
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      // echo 'PROFILE/' . $_SESSION['id'] . '.jpeg';
      echo '<div class="profile__column friendsProfile">';
      if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
        echo '<img src="PROFILE/' . $_SESSION['id'] . '.jpeg"/>';
      } else {
        echo '<img src="PROFILE/default.jpeg"/>';
      }
      echo '<div class="nickName">' . $row["nickname"] . '</div>
        </div>';
    }
  }
}
echo "<hr>";

$searchFriend = "select * from friend where id = '" . $_SESSION['id'] . "' or friendid = '" . $_SESSION['id'] . "' order by id";
$SearchFriendResult = pg_query($conn, $searchFriend);
if ($SearchFriendResult) {
  if (pg_num_rows($SearchFriendResult) > 0) {
    while ($row = pg_fetch_assoc($SearchFriendResult)) {
      if (preg_replace('/\s+/', '', $row["id"]) == $_SESSION['id']) {
        echo '<div class="profile__column friendsProfile long-click">';
        if (file_exists(('../PROFILE/' . $outputString = preg_replace('/\s+/', '', $row["friendid"]) . '.jpeg'))) {
          echo '<img src="PROFILE/' . $outputString = preg_replace('/\s+/', '', $row["friendid"]) . '.jpeg"/>';
        } else {
          echo '<img src="PROFILE/default.jpeg"/>';
        }
        $searchNickNameSql = "select nickname from taxi_userinfo where id = '" . trim($row["friendid"]) . "'";
        $NickNames = pg_query($conn, $searchNickNameSql);
        if ($NickNames) {
          if (pg_num_rows($NickNames) > 0) {
            while ($NickName = pg_fetch_assoc($NickNames)) {
              echo '<div class="nickName">' . $NickName["nickname"] . '</div>
                </div>';
            }
          }
        }

      } else if ($row['friendcheck'] == "t") {
        echo '<div class="profile__column friendsProfile long-click">';
        if (file_exists(('../PROFILE/' . $outputString = preg_replace('/\s+/', '', $row["id"]) . '.jpeg'))) {
          echo '<img src="PROFILE/' . $outputString = preg_replace('/\s+/', '', $row["id"]) . '.jpeg"/>';
        } else {
          echo '<img src="PROFILE/default.jpeg"/>';
        }
        $searchNickNameSql = "select nickname from taxi_userinfo where id = '" . trim($row["id"]) . "'";
        $NickNames = pg_query($conn, $searchNickNameSql);
        if ($NickNames) {
          if (pg_num_rows($NickNames) > 0) {
            while ($NickName = pg_fetch_assoc($NickNames)) {
              echo '<div class="nickName">' . $NickName["nickname"] . '</div>
                </div>';
            }
          }
        }
      }
    }
  }
}
echo '</div>';
pg_close($conn);

?>