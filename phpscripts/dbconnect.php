<?php
$server = "localhost";
$user = "";
$password = "";
$database = "lobotomia";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("wybuchlo: " . $conn->connect_error);
}
echo "jest git";
?>