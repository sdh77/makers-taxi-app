<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$friendBellCheckSQL = "select friend.id, friend.friendid, friend.friendcheck, taxi_userinfo.name
  from friend left join taxi_userinfo on friend.id = taxi_userinfo.id 
  where friendid = '" . $_SESSION['id'] . "' and friendcheck = false";
$friendBellCheckList = pg_query($conn, $friendBellCheckSQL);
echo '<div class="popupHeader">Alarm</div>';
echo '<div class="bellFriend-MainText">';
if ($friendBellCheckList) {
  if (pg_num_rows($friendBellCheckList) > 0) {
    while ($row = pg_fetch_assoc($friendBellCheckList)) {
      echo '<div class="bellFriend-row">
        <div class="bellFriend-name">' .
        $row['name']
        . '</div>
        <div class="bellFriend-add">
          <button class="bellFriend-add__btn">친구 추가</button>
        </div>
      </div>';
    }
  }
}
echo '</div>';



pg_close($conn);

?>