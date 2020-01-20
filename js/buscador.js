function getAllProperties() {
  let route = '/getAllProperties'
  let data = ''

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    formatProperties(result,"tabs-1",false)
  });

}

function getCities() {
  let route = '/getCities'
  let data = ''

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    formatSelect(result, '#selectCiudad')
  });

}

function getTypes() {
  let route = '/getTypes'
  let data = ''

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    formatSelect(result, '#selectTipo')
  });

}

function formatProperties(dataProperties,tab,isSave){
  $("#"+tab+" #divResultadosBusqueda #rowContenido").empty()
  $.each( dataProperties, function( key,value ) {
    let item = ""
    item += "<div class='itemMostrado'>"
    item +=   "<img src='img/home.jpg'>"
    item +=   "<ul class='card-stacked'>"
    item +=     "<li>Dirección: <span data='direccion'>"+value['Direccion']+"</span></li>"
    item +=     "<li>Ciudad: <span data='ciudad'>"+value['Ciudad']+"</span></li>"
    item +=     "<li>Telefono: <span data='telefono'>"+value['Telefono']+"</span></li>"
    item +=     "<li>Codigo postal: <span data='codigo_postal'>"+value['Codigo_Postal']+"</span></li>"
    item +=     "<li>Tipo: <span data='tipo'>"+value['Tipo']+"</span></li>"
    item +=     "<li>Precio: <span data='precio'>"+value['Precio']+"</span></li>"
    if(isSave)
      item +=     "<li><button type='button' onclick='save(this)' id=property-"+value['Id']+">Guardar</button></li>"
    item +=   "</ul>"
    item += "</div>"
    item += "<div class='divider'></div>"
    $("#"+tab+" #divResultadosBusqueda #rowContenido").append(item)
  });
}

function formatSelect(dataCities, select) {
  $.each( dataCities, function( key,value ) {
    $("<option value='"+value+"'>"+value+"</option>").appendTo(select);
  });
}

$( "#submitButton" ).click(function(event) {
  event.preventDefault();

  let form = $("#formulario");
  let data = form.serialize();
  let route = '/search'

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    formatProperties(result,"tabs-1",true);
  });
});

function save(event) {
  let lis = $(event).parent().parent();

  let data = {}
  $(lis).children().each(function() {
    if($(this).find('span').attr('data'))
      data[$(this).find('span').attr('data')] = $(this).find('span').text(); 
  }); 
  
  let route = '/save'

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    alert("Guardado con exito");
  });
}

function list() {
  let route = '/list'
  let data = ''

  $.ajax({
    method: "POST",
    url: 'routes.php',
    data: {route,data},
    dataType: "json"
  }).done(function(result){
    formatProperties(result,"tabs-2",false)
  });
}

getCities();
getTypes();