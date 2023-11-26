<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$noticeSql = "select * from notice";
$noticeDatas = pg_query($conn, $noticeSql);
// echo $noticeSql;
echo '<div class="main-top">
        <p>Notice</p>
        <button class="notice-closeBtn"><i class="fa-solid fa-x"></i></button>
      </div>';
echo '<div class="main-middle">';
echo '  <div class="notice-area">';
if ($noticeDatas) {
  if (pg_num_rows($noticeDatas) > 0) {
    while ($noticeData = pg_fetch_assoc($noticeDatas)) {
      echo '<div class="notice-row">
              <div class="notice-txt">
                <i class="fa-solid fa-bullhorn"></i>
                <div class="notice-title">' . $noticeData['noticetitle'] . '</div>
                <div class="notice-title__txt">' . $noticeData['noticetxt'] . '</div>
              </div>
              <div class="notice-date">' . $noticeData['noticedate'] . '</div>
            </div>';
    }
  }
}

echo '  </div>';
echo '</div>';
pg_close($conn);

?>