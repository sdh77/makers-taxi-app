<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

echo '<div class="main-top">
        <p>Notice</p>
        <button class="notice-closeBtn"><i class="fa-solid fa-x"></i></button>
      </div>';
echo '<div class="main-middle">';
echo '  <div class="notice-area">';
echo '    <div class="notice-row">
            <div class="notice-txt">
              <i class="fa-solid fa-bullhorn"></i>
              <div> 공지 내용</div>
            </div>
            <div class="notice-date"> 0000.00.00</div>
          </div>';
echo '  </div>';
echo '</div>';
pg_close($conn);

?>