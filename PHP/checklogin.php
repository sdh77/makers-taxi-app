<?php
session_start();
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi')
  or die('Could not connect: ' . pg_last_error());

$id = $_POST['id'];
$pwd = $_POST['pwd'];

$sql = "select id, pwd from taxi_userinfo where id = '" . $id . "'";
$result = pg_query($conn, $sql);
if ($result) {
  if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
      if ($row['pwd'] == $pwd) {
        $_SESSION["id"] = $row["id"];
        echo "
        <script type='text/javascript'>
        setTimeout(() => {
          window.location.href = '../mainPage.php';  
        }, 100);
        </script>";

      } else {
        // echo "비밀번호를 확인하세요";
        echo "
        <script type='text/javascript'>
        setTimeout(() => {
        alert('비밀번호를 확인하세요');
        window.location.href = '../loginPage.html';
        },100);
        </script>";
      }
    }
  } else {
    // echo "아이디 정보가 없습니다";
    echo "
        <script>
        alert('아이디 정보가 없습니다.');
        setTimeout(() => {
        window.location.href = '../loginPage.html';
        },100);
        </script>";
  }
}
// echo $sql;

pg_close($conn);
//db연결 종료
?>