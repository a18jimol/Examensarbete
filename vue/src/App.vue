<template>
<div>
  <h1>Vue.js Parking App</h1>
    <hr>
    <div id="meny">
        <div class ="buttons">
            <h2>Load all parking places</h2>
            <button v-on:click="loadAllParking()" id="allParking">Load All</button>
        </div>
        <div class ="buttons">
            <h2>Load free parking places</h2>
            <button v-on:click="loadParking()" id="freeParking">Load Free</button>
        </div>
        <div class ="buttons">
            <h2>Load 5 parking places</h2>
            <button v-on:click="load5Parking()" id="5Parking">Load Free</button>
        </div>
    </div>
    <br>
  <div id="map"></div>
  
</div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from 'axios'

export default {
  data() {
    return {
      map: null,
      markerLayer : null,
      iterations : 1000,
      cnt : 1,
      data : ""
    };
  },
  methods: {
   
  loadAllParking() {
    this.markerLayer.clearLayers(); //remove all old markers
    var start = performance.now(); // start measurement
      axios
        .get('Parking_Meters.json')
        .then(parkingJSON => {
          var parking = parkingJSON;
          (parking.data.features).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)});
          var stop = performance.now(); // stop measurement
          var result=stop-start;
          this.data += result + ", ";
          
            if(this.cnt < this.iterations){
              this.cnt++;
                setTimeout(function(){
                  document.getElementById("allParking").click();
                }, 15000);
                
            }
            else{
               localStorage.setItem("data",this.data);
            }
        });
        
  },
  loadParking() {
    this.markerLayer.clearLayers(); //remove all old markers
    var start = performance.now(); // start measurement
      axios
        .get('Parking_Meters.json')
        .then(parkingJSON => {
          var parking = parkingJSON;
          var filterParking = parking.data.features.filter(item => item.properties.METER_CONDITION == "free"); //filter all parking
          (filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)});
          var stop = performance.now(); // stop measurement
          var result=stop-start;
          this.data += result + ", ";
            if(this.cnt < this.iterations){
              this.cnt++;
                setTimeout(function(){
                  document.getElementById("freeParking").click();
                }, 1000);
                
            }
            else{
               localStorage.setItem("data",this.data);
            }
        });
        
  },
  load5Parking() {
    this.markerLayer.clearLayers(); //remove all old markers
    var start = performance.now(); // start measurement
      axios
        .get('Parking_Meters.json')
        .then(parkingJSON => {
          var parking = parkingJSON;
          var filterParking = parking.data.features.filter(item => item.properties.METER_CONDITION == "open"); //filter all parking
          (filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)});
          var stop = performance.now(); // stop measurement
          var result=stop-start;
          this.data += result + ", ";
            if(this.cnt < this.iterations){
              this.cnt++;
                setTimeout(function(){
                  document.getElementById("5Parking").click();
                }, 1000);
                
            }
            else{
               localStorage.setItem("data",this.data);
            }
        });
        
  }
  },
  mounted() {
    this.map = L.map("map").setView([42.352,-71.072], 13); // set view for the map
    this.markerLayer = L.layerGroup().addTo(this.map); // layergroup 
  },
};
</script>

<style>
body{
    text-align: center;
}
#map{
    height: 1000px;
    width: 1000px;
    margin:auto;
    border: solid black 1px;
}
.buttons{
    display: inline-block;
    width:300px;
}
</style>