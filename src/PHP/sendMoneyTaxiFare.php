<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$makerId = $_POST['makerId'];
$myId = $_POST['myId'];
$sendMoney = $_POST['sendMoney'];
$chatId = $_POST['chatId'];
$searchIdSql = "select * from user_money where id = '" . $myId . "'";
$searchMakerSql = "select * from user_money where id = '" . $makerId . "'";
$searchChatSql = "select * from chatlist where chatid = " . $chatId;
$idList = pg_query($conn, $searchIdSql);
$makerList = pg_query($conn, $searchMakerSql);
$chatList = pg_query($conn, $searchChatSql);
$do = 0;
if ($idList) {
  if (pg_num_rows($idList) > 0) {
    while ($existingMoney = pg_fetch_assoc($idList)) {
      if ($existingMoney['money'] >= $sendMoney) {
        $newMoney = $existingMoney['money'] - $sendMoney;
        $sendMoneySql = "update user_money set money = " . $newMoney . " where id = '" . $myId . "'";
        pg_query($conn, $sendMoneySql);
        $do = 1;
      }
    }
  }
}
if ($do == 1) {
  if ($makerList) {
    if (pg_num_rows($makerList) > 0) {
      while ($existingMoney = pg_fetch_assoc($makerList)) {
        $newMoney = $existingMoney['money'] + $sendMoney;
        $sendMoneySql = "update user_money set money = " . $newMoney . " where id = '" . $makerId . "'";
        pg_query($conn, $sendMoneySql);
        echo "complete";
      }
    } else {
      $sendMoneySql = "insert into user_money values('" . $makerId . "'," . $sendMoney . ")";
      pg_query($conn, $sendMoneySql);
      echo "complete";
    }
  }
  if ($chatList) {
    if (pg_num_rows($chatList) > 0) {
      while ($chatData = pg_fetch_assoc($chatList)) {
        $useInfoSql = "insert into usetaxiinfo(id,startarea,goalarea,passengersnumber,price,date)
        values('" . $myId . "','" . $chatData['startarea'] . "','" . $chatData['goalarea'] . "'," . $chatData['membernum'] . "," . $sendMoney . ",now())";
        pg_query($conn, $useInfoSql);
      }
    }
  }

}

pg_close($conn);
?>