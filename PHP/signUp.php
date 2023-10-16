<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi') or die('Could not connect: ' . pg_last_error());

$name = $_POST['name'];
$id = $_POST['id'];
$account = $_POST['account'];
$nickname = $_POST['nickname'];
$phone = $_POST['phone'];
$loginid = $_POST['loginid'];
$loginpwd = $_POST['loginpwd'];
$sql = "INSERT INTO taxi_userinfo(id, name, pwd, student_ID, account, nickname, phonenumber)
VALUES ('" . $loginid . "', '" . $name . "','" . $loginpwd . "','" . $id . "','" . $account . "','" . $nickname . "'," . $phone . ")";
// echo $sql;
$result = pg_query($conn, $sql);
if ($result) {
  echo '<script type="text/javascript">
  alert("회원가입 성공");
  window.location.href ="../index.html";
  </script>';
} else {
  echo '<script type="text/javascript">
alert("회원가입 실패");
window.location.href ="../signUp.html";
</script>';
}
pg_close($conn);



?>