<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$select = $_POST['select'];
if ($select == "maker") {
  $searchUseInfoSql = "select * from usetaxiinfo where id = '" . $_SESSION['id'] . "' and maker = true";
} else {
  $searchUseInfoSql = "select * from usetaxiinfo where id = '" . $_SESSION['id'] . "' and maker = false";
}
$useInfos = pg_query($conn, $searchUseInfoSql);
if ($useInfos) {
  if (pg_num_rows($useInfos) > 0) {
    while ($useInfo = pg_fetch_assoc($useInfos)) {
      echo '<div class="useInfo">
              <div class="useinfo-date">날짜: ' . substr($useInfo['date'], 0, 16) . '</div>
              <div class="useinfo-startarea">출발지: ' . $useInfo['startarea'] . '</div>
              <div class="useinfo-goalarea">도착지: ' . $useInfo['goalarea'] . '</div>
              <div class="useinfo-passengerNum">인원수: ' . $useInfo['passengersnumber'] . '</div>
              <div class="useinfo-price">가격: ' . $useInfo['price'] . '</div>
            </div>';
    }
  }
}

?>