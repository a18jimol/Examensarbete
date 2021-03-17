var ParkingApp = angular.module("ParkingApp", []);

ParkingApp.controller("ParkingCtrl", function ($scope,$http) {

    $scope.loadMap = function() {
        console.log("hej");
        var map = L.map('map').setView([55,10], 3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);
    }
    $scope.loadParking = function(){
        $scope.parking = model;
        $http.get("Parking_Meters.geojson").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
            console.log($scope.parking) // console log 
            angular.forEach($scope.parking,function(value,key){ // Loop through parking.data
                angular.forEach(value.features,function(value2,key){ // Loop through parking.data.features
                    if( value2.properties.OBJECTID == 1000){
                    console.log(value2.properties.LONGITUDE);
                    }

                });
            });
        });
    }
    
    
});