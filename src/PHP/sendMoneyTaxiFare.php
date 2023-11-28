<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$makerId = $_POST['makerId'];
$myId = $_POST['myId'];
$sendMoney = $_POST['sendMoney'];

$searchIdSql = "select * from user_money where id = '" . $myId . "'";
$searchMakerSql = "select * from user_money where id = '" . $makerId . "'";
$idList = pg_query($conn, $searchIdSql);
$makerList = pg_query($conn, $searchMakerSql);
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
    }
  }
}

pg_close($conn);
?>