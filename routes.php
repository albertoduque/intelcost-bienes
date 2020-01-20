<?php
require_once('searchs.php');

$route = $_POST["route"];
$data = $_POST["data"];

$search = new Search();

switch ($route) {
  case '/getAllProperties':
    $response= $search->getAllProperties();
    break;
  case '/getCities':
    $response= $search->getCities();
    break;
  case '/getTypes':
    $response= $search->getTypes();
    break;
  case '/search':
    $response= $search->search($data);
    break;
  case '/save':
    $response= $search->save($data);
    break;
  case '/list':
    $response= $search->getList();
    break;
}

echo json_encode($response);