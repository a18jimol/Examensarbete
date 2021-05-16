model.controller("ParkingCtrl", function ($scope,$http,$filter) {
    var iterations = 1000;
    var cnt = 1;
    var data ="";
    var map = L.map('map').setView([42.352,-71.072], 13); // variable for the map
    var markerLayer = L.layerGroup().addTo(map);
    
    $scope.loadParking = function(){
        markerLayer.clearLayers(); 
        var start = performance.now(); // start measurement
        $http.get("Parking_Meters.json").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking         
            $scope.filteredParking = $filter('filter')($scope.parking.data.features, "free"); // filter out the 400 free parkingsspaces   
            angular.forEach($scope.filteredParking,function(value,key){ // Loop through parking.data      
                var marker = L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(markerLayer); // making a marker with the cooridnates from the geojson file             
            });
            var stop = performance.now(); // stop measurement
            var result=stop-start;
            data += result + ", ";
                if(cnt < iterations){
                    cnt++;
                    setTimeout(function(){
                        document.getElementById("freeParking").click();
                    }, 1000);
                    
                }
                else{
                     localStorage.setItem("data",data);
                }
            
        });
    }
    $scope.load5Parking = function(){
        markerLayer.clearLayers(); 
        var start = performance.now(); // start measurement
        $http.get("Parking_Meters.json").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking           
            $scope.filteredParking = $filter('filter')($scope.parking.data.features, "open");   //filter out the 5 "open" parkingsspaces
            angular.forEach($scope.filteredParking,function(value,key){ // Loop through parking.data      
                var marker = L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(markerLayer); // making a marker with the cooridnates from the geojson file             
            });
            var stop = performance.now(); // stop measurement
            var result=stop-start;
            data += result + ", ";
                if(cnt < iterations){
                    cnt++;
                    setTimeout(function(){
                        document.getElementById("5Parking").click();
                    }, 1000);
                    
                }
                else{
                     localStorage.setItem("data",data);
                }
            
        });
    }
    $scope.loadAllParking = function(){
        markerLayer.clearLayers();
        var start = performance.now(); // start measurement
        $http.get("Parking_Meters.json").then(function (parking) { // Access to the parking meters geojson-file
            $scope.parking = parking; // adding the content of the JSON-file to $scope.parking
            angular.forEach($scope.parking.data.features,function(value,key){ // Loop through parking.data      
                var marker = L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(markerLayer); // making a marker with the cooridnates from the geojson file             
            });
            var stop = performance.now(); // stop measurement
            var result=stop-start;
            data += result + ", ";
                if(cnt < iterations){
                    cnt++;
                    setTimeout(function(){
                        document.getElementById("allParking").click();
                    }, 15000);
                    
                }
                else{
                     localStorage.setItem("data",data);
                }
        });
    }
    
    
});