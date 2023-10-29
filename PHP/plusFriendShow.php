<?php
session_start();
echo '
<div class="plusFriend">
<div class="popupHeader">add</div>
<form class="plusFriend-row" action="PHP/plusFriend.php", method="post">
<input class="plusFriend-id" type="text" placeholder="친구의 아이디를 입력하시오" name="friendId"/>
<button class="submitAddFriend" type="submit" onclick="NoAction()">검색</button>
</form>
<div class="plusFriend-row">
<div>나의 아이디</div>
<div>' . $_SESSION['id'] . '</div>
</div>
</div>


';
?>
<script>
  console.log("asd");
</script>