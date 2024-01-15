<template>
  <div id="map" class="map-container"></div>
</template>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

<script setup>
import mapboxgl from 'mapbox-gl';
import {onMounted} from "vue";
import 'mapbox-gl/dist/mapbox-gl.css';

const props = defineProps({
  coordinates: {
    type: Array,
    required: true
  },
  centerLocation: {
    type: Array,
    required: true
  }
})
onMounted(async () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbWVzIiwiYSI6ImNscDB5ZmhhYjBibWUyanFvaWd6emYxamsifQ.rGsg54JBge3oYfVd0L9N0Q'; // Replace with your Mapbox access token
  console.log('props', props)
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    // style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: props.centerLocation,
    zoom: 13.5
  });
  map.on('load', () => {
    map.addSource('polygon', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [props.coordinates]
        }
      }
    });

    map.addLayer({
      'id': 'polygon',
      'type': 'fill',
      'source': 'polygon',
      'paint': {
        'fill-color': '#ec91e8',
        'fill-opacity': 0.3
      }
    });

    map.addLayer({
      'id': 'polygon-outline',
      'type': 'line',
      'source': 'polygon',
      'paint': {
        'line-color': '#000',
        'line-width': 3
      }
    });
  });
})
</script>

<style>
.map-container {
  height: 400px; /* Adjust as needed */
}
body { margin-bottom: 0; padding: 0; }
#map { position: relative; bottom: 0; width: 100%; }
</style>
