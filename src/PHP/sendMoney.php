<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$myId = $_POST['myId'];
$sendMoney = (int) $_POST['sendMoney'];
$searchIdSql = "select * from user_money where id = '" . $myId . "'";
$idList = pg_query($conn, $searchIdSql);
if ($idList) {
  if (pg_num_rows($idList) > 0) {
    while ($existingMoney = pg_fetch_assoc($idList)) {
      if ($existingMoney['money'] >= $sendMoney) {
        $newMoney = $existingMoney['money'] - $sendMoney;
        echo $newMoney;
        $sendMoneySql = "update user_money set money = " . $newMoney . " where id = '" . $myId . "'";
        pg_query($conn, $sendMoneySql);

      } else {
        echo "<script>
          alert('입력하신 금액이 잔고보다 많습니다.');
          </script>";
      }
    }
  } else {
    echo "<script>
      alert('입력하신 금액이 잔고보다 많습니다.');
      </script>";
  }
}

pg_close($conn);
?>