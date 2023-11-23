<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$friendNickName = $_POST['friendNickName'];
$myId = $_POST['myId'];
$friendId;
$SearchIdsql = "select id from taxi_userinfo where nickname = '" . $friendNickName . "'";
$NickNames = pg_query($conn, $SearchIdsql);
if ($NickNames) {
  if (pg_num_rows($NickNames) > 0) {
    while ($row = pg_fetch_assoc($NickNames)) {
      $friendId = $row['id'];
    }
  }
}
$SearchStateSql = "select * from friend where id = '" . $myId . "' and friendid = '" . $friendId . "'";
$states = pg_query($conn, $SearchStateSql);
if ($states) {
  if (pg_num_rows($states) > 0) {
    $deleteFriendSql = "delete from friend where id = '" . $myId . "' and friendid = '" . $friendId . "'";
  } else {
    $deleteFriendSql = "update friend set friendcheck = false where friendid = '" . $myId . "' and id = '" . $friendId . "'";
  }
}
// $deleteFriendSql = "delete from friend where id = '" . $myId . "' and friendid = '" . $friendId . "'";
// echo $deleteFriendSql;
pg_query($conn, $deleteFriendSql);

pg_close($conn);
?>