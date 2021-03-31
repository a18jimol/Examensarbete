var ParkingApp = angular.module("ParkingApp", []);

angular.module("parkingApp", []).controller("ParkingCtrl", function ($scope,$http,$filter) {
    var map = L.map('map').setView([42.352,-71.072], 13); // variable for the map
    var markerLayer = L.layerGroup().addTo(map);
    $scope.loadParking = function(){
        $http.get("../Parking_Meters.json").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
            console.log($scope.parking); // console log 
            
            $scope.filteredParking = $filter('filter')($scope.parking.data.features, "free"); // filter out the free parkings
            console.log($scope.filteredParking);
            markerLayer.clearLayers(); 
            angular.forEach($scope.filteredParking,function(value,key){ // Loop through parking.data      
                var marker = L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(markerLayer); // making a marker with the cooridnates from the geojson file             
            });
        });
    }
    $scope.loadAllParking = function(){
        $http.get("../Parking_Meters.json").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
            console.log($scope.parking); // console log 
            markerLayer.clearLayers();
            angular.forEach($scope.parking.data.features,function(value,key){ // Loop through parking.data      
                var marker = L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(markerLayer); // making a marker with the cooridnates from the geojson file             
            });
        });
    }
    
    
});