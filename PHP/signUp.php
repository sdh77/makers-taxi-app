<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi') or die('Could not connect: ' . pg_last_error());
$name = $_GET['name'];
$id = $_GET['id'];
$account = $_GET['account'];
$nickname = $_GET['nickname'];
$phone = $_GET['phone'];
$loginid = $_GET['loginid'];
$loginpwd = $_GET['loginpwd'];
$sql = "INSERT INTO taxi_userinfo(id, name, pwd, pwd, student_ID, account, nickname, phonenumber)
VALUES ('".$id."', '".$name."','".$pwd."','".$student_ID."','".$account."','".$nickname."',".$phonenumber.")"
echo $sql; 

pg_query($conn, $sql);
pg_close($conn);

?>