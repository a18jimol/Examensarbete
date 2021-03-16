var model = {
    framework: "Anuglar"
};

var ParkingApp = angular.module("ParkingApp", []);

ParkingApp.controller("ParkingCtrl", function ($scope,$http) {
    $scope.parking = model;
      
      
});