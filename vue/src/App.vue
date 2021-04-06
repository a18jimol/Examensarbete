<template>
<div>
  <h1>Vue.js Parking App</h1>
    <hr>
    <div id="meny">
        <div class ="buttons">
            <h2>Load all parking places</h2>
            <button ng-click="loadAllParking()" id="allParking">Load All</button>
        </div>
        <div class ="buttons">
            <h2>Load free parking places</h2>
            <button ng-click="loadParking()" id="freeParking">Load Free</button>
        </div>
    </div>
    <br>
  <div id="map"></div>
  
</div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import json from '../../Parking_Meters.json'; // import the json data

export default {
  data() {
    return {
      map: null,
      parking:json.data, // save the data
      markerLayer : null,
      filterParking: null
    };
  },
  methods: {
   
  loadAllParking() {
      this.markerLayer.clearLayers(); //remove all old markers
      //console.log(json.features);
      this.filterParking = json.features; // all parking spaces
      console.log(this.filterParking);
      (this.filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)}); // write the markers
  },
  loadParking() {
      this.markerLayer.clearLayers(); //remove all old markers
      //console.log(json.features);
      this.filterParking = json.features.filter(item => item.properties.METER_CONDITION == "free"); //filter all parking
      console.log(this.filterParking);
      (this.filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)}); // write the markers
  }
  },
  mounted() {
    this.map = L.map("map").setView([42.352,-71.072], 13); // set view for the map
    this.markerLayer = L.layerGroup().addTo(this.map); // layergroup 
  },
};
</script>

<style>
#map{
    height: 1000px;
    width: 1000px;
}
</style>