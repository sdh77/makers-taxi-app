<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

echo '<div class="main-top">
        <p>이용 내역</p>
        <button class="consumptionAmount-closeBtn"><i class="fa-solid fa-x"></i></button>
      </div>';
echo '<div class="main-middle">';
echo '  <div class="consumptionAmount">
          <div class="consumptionAmount-select">
            <button class="consumptionAmount-make consumptionAmount-click">만든 방</button>
            <button class="consumptionAmount-enter">들어간 방</button>
          </div>
          <div>이용 내역</div>
        <div>';
echo '</div>';
pg_close($conn);

?>