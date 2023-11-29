<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());
$getMoneySql = "select money from user_money where id = '" . $_SESSION["id"] . "'";
$moneyList = pg_query($conn, $getMoneySql);
$money;
if ($moneyList) {
  if (pg_num_rows($moneyList) > 0)
    while ($moneyData = pg_fetch_assoc($moneyList))
      $money = $moneyData['money'];
  else
    $money = 0;
}
echo '<div class="main-top">
        <p>Setting</p>
      </div>';
echo '<div class="main-middle">
        <div class="setProfile">
          <div class="profile__column profileImg">';
if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
  echo '<img src="PROFILE/' . $_SESSION['id'] . '.jpeg"/>';
} else {
  echo '<img src="PROFILE/default.jpeg"/>';
}
echo '<h2>' . $_SESSION["id"] . '</h2>
          </div>
          <div class="profile__column">
            <span class="icon">❤️‍🔥</span>
            <span>9999!! </span>
          </div>
        </div>';
// echo "<hr>";
echo '<div class="setArea">
        <div class="setArea-money">
          <div class="setArea-myMoney">
            <div class="setArea-myMoney__txt">타냥pay</div>
            <div class="setArea-myMoney__money">' . $money . '원</div>
          </div>
          <div class="setArea-money_btn">
            <button class="setArea-chargeMoney"><i class="fa-solid fa-plus"></i> 충전</button>
            <button class="setArea-sendMoney"><i class="fa-solid fa-won-sign"></i> 출금</button>
          </div>
        </div>';
echo '  <button class="setArea-announcement">
          공지사항
        </button>
        <button class="setArea-consumptionAmount">
          이용 내역
        </button>
        <button class="setArea-logout">
          로그아웃
        </button>';
echo '</div>';
pg_close($conn);

?>