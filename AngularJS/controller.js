var ParkingApp = angular.module("ParkingApp", []);

ParkingApp.controller("ParkingCtrl", function ($scope,$http) {
    // $scope.parking = model;
    $http.get("Parking_Meters.geojson").then(function (parking) { // Access to the parking meters geojson-file
        $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
        console.log($scope.parking) // console log 
    });
      
});