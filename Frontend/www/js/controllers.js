var latitudeInicial = -22.858926;
var longitudeInicial = -43.2285518;

var app = angular.module('starter.controllers', []);

/*
function foto(){
   navigator.camera.getPicture(cameraSuccess, cameraError, {quality: 50});

}
function cameraSuccess(){
    $scope.ck = {checked: true};
}

function cameraError(){
    $scope.ck = {checked: false};
}
*/
function bindInfoWindow(marker, map, infoWindow, html) {
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });
        };


app.controller('PagsCtrl', function($scope){


  $scope.abrir = function(url) {
     location.href=url;
  }

  $scope.foto = function(){
    navigator.camera.getPicture(function(){$scope.ck = {checked: true};}, function(){$scope.ck = {checked: false};}, {quality: 50});
  }


});


   /*         ,
          
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
            */


app.controller('MapController', function($scope, $ionicLoading) {
 
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(latitudeInicial, longitudeInicial);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 /*
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "Eventos Academicos"
            });
        });
*/
        var infoWindow = new google.maps.InfoWindow;

        var ct = new google.maps.Marker({
            position: new google.maps.LatLng(-22.8589312,-43.2309969),
            map: map,
            title: "Hackathon UFRJ"
        });
        var html = "<b>Hackathon UFRJ</b>"
        bindInfoWindow(ct, map, infoWindow, html);

        $scope.map = map;
    });
 
});

app.controller('MapController2', function($scope, $ionicLoading) {
 
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(latitudeInicial, longitudeInicial);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 /*
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "Eventos não-acadêmicos"
            });
        });
 */     
        //-22.8642174,-43.2163401,21z
        var infoWindow = new google.maps.InfoWindow;

        var mg = new google.maps.Marker({
            position: new google.maps.LatLng(-22.8642174,-43.2163401),
            map: map,
            title: "Mangue"
        });
        var html = "<b>Mangue </b>"
        bindInfoWindow(mg, map, infoWindow, html);
        $scope.map = map;
    });
 
});

app.controller('MapControllerBandejao', function($scope, $ionicLoading) {
 
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(-22.8550249,-43.2294096);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var infoWindow = new google.maps.InfoWindow;

        var ct = new google.maps.Marker({
            position: new google.maps.LatLng(-22.8593384,-43.2306701),
            map: map,
            title: "Bandejão do CT",
            icon: "img/red-dot.png"
        });
        var html = "<b>Bandejão CT </b>"
        bindInfoWindow(ct, map, infoWindow, html);

        var central = new google.maps.Marker({
            position: new google.maps.LatLng(-22.8447461,-43.2344535),
            map: map,
            title: "Bandejão Central",
            icon: "img/yellow-dot.png"
        });
        var html = "<b>Bandejão Central </b>"
        bindInfoWindow(central, map, infoWindow, html);

        var letras = new google.maps.Marker({
            position: new google.maps.LatLng(-22.860346,-43.2247264),
            map: map,
            title: "Bandejão Letras",
            icon: "img/green-dot.png"
        });
        var html = "<b>Bandejão Letras </b>"
        bindInfoWindow(letras, map, infoWindow, html);

        $scope.map = map;
    });
 
});