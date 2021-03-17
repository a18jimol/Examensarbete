var ParkingApp = angular.module("ParkingApp", []);

ParkingApp.controller("ParkingCtrl", function ($scope,$http) {
    var map = L.map('map').setView([42.352,-71.072], 13); // variable for the map
    $scope.loadMap = function() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // adding the map layer
        maxZoom: 20,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>' // copyright to openstreetmap
      }).addTo(map);
    }
    $scope.loadParking = function(){
        $http.get("Parking_Meters.geojson").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
            console.log($scope.parking) // console log 
            angular.forEach($scope.parking,function(value,key){ // Loop through parking.data
                angular.forEach(value.features,function(value2,key){ // Loop through parking.data.features
                    if( value2.properties.OBJECTID <= 500){ // loading the first 500
                        var marker = L.marker([value2.properties.LATITUDE, value2.properties.LONGITUDE]).addTo(map); // making a marker with the cooridnates from the geojson file
                    }

                });
            });
        });
    }
    
    
});