<template>
<div>
  <button  v-on:click="loadMap">Load Map</button>
  <button  v-on:click="loadParking">Load Parking</button>
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
   
  loadMap() {
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
  loadParking() {
      var random1 = Math.floor((Math.random()*500)+1000); // random number
      this.markerLayer.clearLayers(); //remove all old markers
      //console.log(json.features);
      this.filterParking = json.features.filter(item => item.properties.OBJECTID < random1); //filter all parking
      console.log(this.filterParking);
      (this.filterParking).forEach((value) => {L.marker([value.properties.LATITUDE, value.properties.LONGITUDE]).addTo(this.markerLayer)}); // write the markers
  }},
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