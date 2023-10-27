<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$sql = "select nickname from taxi_userinfo where id = '" . $_SESSION["id"] . "'";
$result = pg_query($conn, $sql);
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      // echo 'PROFILE/' . $_SESSION['id'] . '.jpeg';
      echo '<div class="profile__column friendsProfile">';
      if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
        echo '<img src="PROFILE/' . $_SESSION['id'] . '.jpeg"/>';
      } else {
        echo '<img src="PROFILE/image.jpeg"/>';
      }
      echo '<div class="nickName">' . $row["nickname"] . '</div>
        </div>';
    }
  }
}
echo "<hr>";

$searchFriend = "select * from friend where id = '" . $_SESSION['id'] . "'";
$SearchFriendResult = pg_query($conn, $searchFriend);
if ($SearchFriendResult) {
  if (pg_num_rows($SearchFriendResult) > 0) {
    while ($row = pg_fetch_assoc($SearchFriendResult)) {
      echo '<div class="profile__column friendsProfile">';
      if (file_exists(('../PROFILE/' . $row["friendid"] . '.jpeg'))) {
        echo '<img src="PROFILE/' . $row["friendid"] . '.jpeg"/>';
      } else {
        echo '<img src="PROFILE/image.jpeg"/>';
      }
      echo '<div class="nickName">' . $row["friendid"] . '</div>
        </div>';
    }
  }
}

?>
<img src="" alt="">