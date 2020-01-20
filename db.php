<?php

function openConnection()
{
  $servername = "localhost";
  $username = "naturgas2";
  $password = "123";
  $db = "intelcost_bienes";

  // Create connection
  $conn = mysqli_connect($servername, $username, $password,$db);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  return $conn;
}

function closeConnection($conn)
{
 $conn -> close();
}
?>