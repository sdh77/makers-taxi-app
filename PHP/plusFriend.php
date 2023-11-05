<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$friendId = isset($_POST['friendId']) ? $_POST['friendId'] : "";
$friendName = isset($_POST['friendName']) ? $_POST['friendName'] : "";
$myId = $_POST['myId'];
if ($friendName != "") {
  $searchFriendId = "update friend set friendcheck = true from (select friend.id, friend.friendid, friend.friendcheck, taxi_userinfo.name
    from friend left join taxi_userinfo on friend.id = taxi_userinfo.id 
    where friendid = '" . $myId . "' and friendcheck = false and taxi_userinfo.name = '" . $friendName . "') as friendId
    where friend.id = friendId.id
    ";
  $FriendId = pg_query($conn, $searchFriendId);
} else if ($friendId != "") {
  //친구 아이디 존재 여부 확인
  $searchFriendId = "select * from taxi_userinfo where id = '" . $friendId . "'";
  $FriendIdList = pg_query($conn, $searchFriendId);
  $findId = 0;
  if ($FriendIdList) {
    if (pg_num_rows($FriendIdList) > 0) {
      while ($row = pg_fetch_assoc($FriendIdList)) {
        $findId++;
      }
    }
  }

  //중복 확인
  $searchFriendList = "select * from friend where id = '" . $myId . "'";
  $FriendList = pg_query($conn, $searchFriendList);
  $findIt = 0;
  if ($FriendList) {
    if (pg_num_rows($FriendList) > 0) {
      while ($row = pg_fetch_assoc($FriendList)) {
        if (preg_replace('/\s+/', '', $row["friendid"]) == $friendId) {
          $findIt++;
        }
      }
    }
  }

  //친구신청을 통해 이미 친구인지 확인
  $searchFriendAllow = "select * from friend where friendcheck = true and id = '" . $friendId . "'";
  echo "" . $searchFriendAllow . "";
  $FriendAllowList = pg_query($conn, $searchFriendAllow);
  $findAllow = 0;
  if ($FriendAllowList) {
    if (pg_num_rows($FriendAllowList) > 0) {
      while ($row = pg_fetch_assoc($FriendAllowList)) {
        $findAllow++;
      }
    }
  }

  //자기 아이디와 입력한 아이디가 동일할떄
  $duplicationId = 0;
  if($friendId == $myId){
    $duplicationId = 1;
  }
  echo $findId;
  echo $findIt;
  echo $findAllow;
  echo $duplicationId;
  $addSql = "insert into friend(id,friendId) values('" . $myId . "','" . $friendId . "')";
  if ($findId != 0 && $findIt == 0 && $findAllow == 0 && $duplicationId == 0) {
    pg_query($conn, $addSql);
  }
}
pg_close($conn);
?>