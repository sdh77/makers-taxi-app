<?php
$conn = pg_connect('host=localhost port=5432 dbname=tanyang user=sanggeukz password=taxi') or die('Could not connect: ' . pg_last_error());
$id = $_GET['id'];
$pwd = $_GET['pwd'];
$sql = "select id,pwd from taxi_userinfo where id = '".$id."'";

echo $sql;
 
$result = pg_query($conn, $sql);
if($result){
  if(pg_num_rows($result)>0){
    while($row = pg_fetch_assoc($result)){
      //비밀번호 == 비밀번호
      if($row['pwd'] == $pwd)
        echo "<script type='text/javascript'> alert('로그인 완료'); 
        window.location.href = '../#';
        </script>";  
      else
        echo "<script type='text/javascript'> alert('비밀번호를 확인해주세요'); </script>";
    }   
  }
  else echo "<script type='text/javascript'> alert('아이디를 확인해주세요'); </script>";
}
pg_close($conn);

?>