<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$chatId = $_POST['chatId'];
$searchUserSql = "select * from taxi_userinfo where chatid = " . $chatId;
$searchUsers = pg_query($conn, $searchUserSql);
$user = []; // 빈 배열 선언

if ($searchUsers) {
  if (pg_num_rows($searchUsers) > 0) {
    $i = 0;
    while ($searchUser = pg_fetch_assoc($searchUsers)) {
      $user[$i] = $searchUser['id'];
      $i++;
    }
  }
}

$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$searchChats = pg_query($conn, $searchChatSql);
if ($searchChats) {
  if (pg_num_rows($searchChats) > 0) {
    while ($searchChat = pg_fetch_assoc($searchChats)) {

      for ($i = 0; $i < count($user); $i++) {
        if ($user[$i] == $searchChat['maker']) {
          unset($user[$i]);
        }
      }
    }
  }
}
$user = array_values($user);
if (count($user) == 1) {
  $updateEntrantSql = "UPDATE chatlist
  SET entrant1 = '" . $user[0] . "'
  WHERE chatid = " . $chatId;
  $searchChats = pg_query($conn, $updateEntrantSql);
} else if (count($user) == 2) {
  $updateEntrantSql = "UPDATE chatlist
  SET entrant1 = '" . $user[0] . "',
      entrant2 = '" . $user[1] . "'
  WHERE chatid = " . $chatId;
  $searchChats = pg_query($conn, $updateEntrantSql);
} else if (count($user) == 3) {
  $updateEntrantSql = "UPDATE chatlist
  SET entrant1 = '" . $user[0] . "',
      entrant2 = '" . $user[1] . "',
      entrant3 = '" . $user[2] . "'
  WHERE chatid = " . $chatId;
  $searchChats = pg_query($conn, $updateEntrantSql);
}

$updateStateSql = "update chatlist set state = true where chatid = " . $chatId;
pg_query($conn, $updateStateSql);

pg_close($conn);

?>