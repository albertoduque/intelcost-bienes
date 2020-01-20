<?php

include 'db.php';

class Search {

  public $string;
  public $json;
  public $conn;

  function __construct(){
    $this->string = file_get_contents("./data-1.json");
    $this->json = json_decode($this->string, true);
    $this->conn = openConnection();
  }

  function getAllProperties() 
  {  
    return $this->json;
  }

  function getCities()
  {
    $cities = array_column($this->json, 'Ciudad');
    $result = array_unique($cities);

    return $result;
  }

  function getTypes()
  {
    $types = array_column($this->json, 'Tipo');
    $resultado = array_unique($types);

    return $resultado;
  }

  function search($data)
  {
    $searchData = array();
    $dataResult = array();

    parse_str($data, $searchData);

    foreach ($this->json as $item) {
      if ($item['Ciudad'] == $searchData['ciudad'] && $item['Tipo'] == $searchData['tipo']) {
        array_push($dataResult, $item);
      }
    }

    return $dataResult;
  }

  function save($data)
  {
    $sql = "INSERT INTO bienes (direccion, ciudad_id, telefono, codigo_postal, tipo_id, precio) 
    VALUES ('".$data['direccion']."', '0', '".$data['telefono']."', '".$data['codigo_postal']."'
    , '0', '".$data['precio']."')";

  
    if(mysqli_query($this->conn, $sql)){
      return true;
    }
    return false;
  }

  function getList()
  {
    $sql = "SELECT b.id,direccion,telefono,c.nombre as ciudad,codigo_postal,t.nombre as tipo,precio 
    FROM bienes b
    left join ciudades c on (c.id=b.ciudad_id)
    left join tipos t on(t.id=b.tipo_id)";
    $result = mysqli_query($this->conn,$sql);
    $dataResult = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $item["Id"] = $row["id"];
          $item["Direccion"] = $row["direccion"];
          $item["Ciudad"] = $row["ciudad"];
          $item["Telefono"] = $row["telefono"];
          $item["Codigo_Postal"] = $row["codigo_postal"];
          $item["Tipo"] = $row["tipo"];
          $item["Precio"] = $row["precio"];
          array_push($dataResult, $item);
        }
    }

    return $dataResult;
  }
}