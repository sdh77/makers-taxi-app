<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$FindSql = "select * from chatlist where state = false order by endtime limit 1";
$findDatas = pg_query($conn, $FindSql);
if ($findDatas) {
  if (pg_num_rows($findDatas) > 0) {
    while ($findData = pg_fetch_array($findDatas)) {
      echo $findData['chatid'];
    }
  } else {
    echo "noChat";
  }
}
pg_close($conn);

?>