var ParkingApp = angular.module("ParkingApp", []);

ParkingApp.controller("ParkingCtrl", function ($scope,$http) {
    // $scope.parking = model;
    $http.get("Parking_Meters.geojson").then(function (parking) { // Access to the parking meters geojson-file
        $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
        console.log($scope.parking) // console log 
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        angular.forEach($scope.parking,function(value,key){ // Loop through parking.data
            angular.forEach(value.features,function(value2,key){ // Loop through parking.data.features
                //console.log("hej"+value2.properties.OBJECTID);
                ctx.fillRect(value2.properties.LONGITUDE,value2.properties.LATITUDE,10,10); // Use the coordinates of each parking loot to write them in the canvas
            });
        });
    });
    
});