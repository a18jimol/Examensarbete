<template>
<div>
  <button >Load Map</button>
  <button >Load Parking</button>
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
      parking:json.data // save the data
    };
  },
  mounted() {
    this.map = L.map("map").setView([42.352,-71.072], 13); // set view for the map
  },
};
</script>

<style>
#map{
    height: 1000px;
    width: 1000px;
}
</style>