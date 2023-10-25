<?php
session_start();
if (isset($_SESSION["id"])) {
  echo '<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>기능 화면</title>
  <link rel="stylesheet" href="CSS/styles.css" />
</head>

<body>
  <div class="main-top"></div>

  <div class="main-middle"></div>
  <div class="main-bottom">
    <div>
      <button class="people">
        <i class="fa-solid fa-user-group"></i>
      </button>
    </div>
    <div>
      <button class="chat">
        <i class="fa-regular fa-comment"></i>
      </button>
    </div>
    <div>
      <button class="set">
        <i class="fa-solid fa-gear"></i>
      </button>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

  <script src="https://kit.fontawesome.com/8a7266dac6.js" crossorigin="anonymous"></script>
  <script src="JS/showEach.js"></script>
</body>

</html>';
} else {

  echo "로그인을 해주세요";
}
?>