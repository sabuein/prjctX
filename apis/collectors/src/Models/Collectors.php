<?php
// Create new collector
$username = mysqli_real_escape_string($conn, $_POST["username"]);
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);