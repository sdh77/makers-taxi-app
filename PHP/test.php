<?php
session_start();

if (file_exists(('../PROFILE/' . $_SESSION['id'] . '.jpeg'))) {
  echo '<img src="../PROFILE/' . $_SESSION['id'] . '.jpeg"/>';
} else {
  echo '<img src="../PROFILE/image.jpeg"/>';
}
?>