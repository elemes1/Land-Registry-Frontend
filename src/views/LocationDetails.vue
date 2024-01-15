<template>
  <div class="mt-24 mb-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:flex-none flex flex-col">
    <div class="w-11/12 sm:w-10/12 mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold my-6">{{ headerName }}</h1>
      <hr class="border-4 border-green-900 sm:my-12 my-6">

      <div
        class="flex flex-col sm:w-1/2 lg:w-2/3 bg-white border-4 shadow-b-md border-gray-950 shadow-sm p-4 md:p-5 mb-8 sm:mt-12 mt-6">
        <div class="flex  lg:flex-col  flex-row  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap ">Name: </span>
          <span>{{ locationDetails?.properties?.name }}</span>
        </div>
        <div class="flex  lg:flex-col  flex-col  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap ">State Code: </span>
          <span>{{ locationDetails?.properties?.state_code }}</span>
        </div>
        <div class="flex  lg:flex-col  flex-col  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap">Source: </span>
          <span>{{ locationDetails?.properties?.source }}</span>
        </div>
        <div class="flex  lg:flex-col  flex-col  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap">Ward: </span>
          <span>{{ locationDetails?.properties?.ward_code }}</span>
        </div>
        <div class="flex  lg:flex-col  flex-col  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap">Major Road Dist: </span>
          <span>{{ locationDetails?.properties?.major_road_dist }}</span>
        </div>
        <div class="flex  lg:flex-col  flex-col  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap">LGA Dist: </span>
          <span>{{ locationDetails?.properties?.lga_dist }}</span>
        </div>
        <div class="flex flex-col  lg:flex-row  text-lg">
          <span class="font-semibold mr-4 whitespace-nowrap">Ward Dist: </span>
          <span>{{ locationDetails?.properties?.ward_dist }}</span>
        </div>

      </div>
    </div>
    <div class="map-container mb-6 mx-6">
      <h1 class="text-2xl sm:text-3xl font-bold my-3 sm:my-6">Layout View</h1>
      <hr class="border-4 border-green-900 sm:my-12 my-4">
      <MapboxArea v-if="isDataLoaded" :coordinates="locationDetails?.geometry?.coordinates[0][0]"
        :centerLocation="locationDetails?.geometry?.coordinates[0][0][5]" />
    </div>
    <div class="mt-24 w-11/12 sm:w-8/12 mx-auto sm:max-h-24">
      <div class="bg-white shadow-lg rounded p-6 space-y-4">
        <h2 class="text-xl font-bold border-b pb-2">Location(s): Please select exact location</h2>
        <p class="text-blue-500">Click any link to view transactions/ information about the property</p>
        <div class="max-h-96 overflow-y-auto">
          <table class="w-full border-collapse ">
            <thead>
              <tr>
                <th class="border p-2">Location Name</th>
                <th class="border p-2">Longitude - Latitude</th>
              </tr>
            </thead>
            <tbody>
              <!-- Sample row, repeat for each coordinate pair -->
              <tr v-for="(cord, index) in locationDetails?.geometry?.coordinates[0][0]" :key="index">
                <td class="border p-2">
                  <router-link class="text-green-800 underline"
                    :to="{ name: 'search.details.summary', query: { lat: cord[1], lon: cord[0] } }">
                    {{ addresses[index] || 'Fetching address...' }}
                  </router-link>

                </td>
                <td class="border p-2">
                  <router-link class="text-green-800 underline"
                    :to="{ name: 'search.details.summary', query: { lat: cord[1], lon: cord[0] } }">
                    {{ cord[0] }} - {{ cord[1] }}
                  </router-link>
                </td>
              </tr>
              <!-- ... other rows -->
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import MapboxArea from "../components/MapboxArea.vue"
import { useGeolocation } from '../utils/gmaps';

const globalStore = useGlobalStore();
const locationData = ref([])
const locationDetails = ref([])

const { fetchAddressByCoordsAsync } = useGeolocation();
const route = useRoute();
const locationId = computed(() => route.params.recId)
const headerName = ref("loading result and map, please wait....")
const isDataLoaded = ref(false);
const addresses = reactive({});
const addressLinks = reactive({});
const dataset = []

onMounted(async () => {
  dataset.value = await globalStore.getMergedDataset();

  console.log(dataset.value)
  const feature = dataset.value.find(item => item.properties.global_id === locationId.value);
  if (feature && feature.geometry && feature.geometry.coordinates) {
    locationDetails.value = feature;
    headerName.value = `${locationDetails.value.properties.name} - ${locationDetails.value.properties.state_code}`;
    isDataLoaded.value = true;
    fetchAddresses(feature.geometry.coordinates[0][0]);
  } else {
    console.error('Location details not found or invalid format');
  }
});

// Use a watcher to update addresses if locationDetails changes
watch(() => locationDetails.value?.geometry?.coordinates, async (newCoords) => {
  if (newCoords && newCoords[0] && newCoords[0][0]) {
    fetchAddresses(newCoords[0][0]);
  }
}, { deep: true });

const fetchAddresses = async (coords) => {
  console.log('this is coordiante', coords)
  for (let i = 0; i < coords.length; i++) {
    const cord = coords[i];
    addresses[i] = await fetchAddressByCoordsAsync(cord[1], cord[0]);
    addressLinks[i] = `https://geocode.maps.co/reverse?lat=${cord[1]}&lon=${cord[0]}`;
  }
};
</script>
