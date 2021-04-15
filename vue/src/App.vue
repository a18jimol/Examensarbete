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
      parking:null, // save the data
      markerLayer : null,
      filterParking: null
    };
  },
  methods: {
   
  loadAllParking() {
    this.markerLayer.clearLayers(); //remove all old markers
      axios
        .get('Parking_Meters.json')
        .then(parking => {
          this.parking = parking; 
          (this.parking.data.features).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)});
        });
        
  },
  loadParking() {
    this.markerLayer.clearLayers(); //remove all old markers
      axios
        .get('Parking_Meters.json')
        .then(parking => {
          this.parking = parking;
          this.filterParking = this.parking.data.features.filter(item => item.properties.METER_CONDITION == "free"); //filter all parking
          (this.filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)});
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