<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$myId = $_POST['myId'];
$chargeMoney = (int) str_replace("원", "", $_POST['chargeMoney']);
echo gettype($chargeMoney);
$searchIdSql = "select * from user_money where id = '" . $myId . "'";
$idList = pg_query($conn, $searchIdSql);
if ($idList) {
  if (pg_num_rows($idList) > 0) {
    while ($existingMoney = pg_fetch_assoc($idList)) {
      $newMoney = $chargeMoney + $existingMoney['money'];
      echo $newMoney;
      $chargeMoneySql = "update user_money set money = " . $newMoney . " where id = '" . $myId . "'";
    }
  } else
    $chargeMoneySql = "insert into user_money values('" . $myId . "'," . $chargeMoney . ")";
}
pg_query($conn, $chargeMoneySql);
pg_close($conn);
?>