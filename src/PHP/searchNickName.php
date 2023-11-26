<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$searchId = $_POST["searchId"];
$searchSql = "select nickname from taxi_userinfo where id = '" . $searchId . "'";
$searchNickName = pg_query($conn, $searchSql);
// echo $searchSql;
if ($searchNickName) {
  if (pg_num_rows($searchNickName) > 0) {
    while ($row = pg_fetch_assoc($searchNickName)) {
      // if (preg_replace('/\s+/', '', $row["friendid"]) == $searchNickName) {
      $row['nickname'];
      // }
    }
  }
}
pg_close($conn);

?>