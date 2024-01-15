<template>
  <div class="mt-24">
    <Form @submit="handleSubmit">
      <div
        class="flex flex-col w-4/5 min-w-3/5 mx-auto bg-white border-4 shadow-b-md border-gray-950 shadow-sm p-4 md:p-5 mb-24 mt-12 items-center">
        <h1 class="text-xl sm:text-3xl font-bold my-6 text-center">Search by location / approximate coordinates</h1>

        <div class="flex flex-col sm:flex-row sm:w-4/5">
          <div class="p-2 sm:p-4 overflow-y-auto sm:w-2/5 w-full">
            <label for="lat-label" class="block text-md font-medium mb-2">Latitude</label>
            <Field type="text" id="lat-label" v-model="currentLatitude"
              class="py-3 px-4 block w-full border-4 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
              placeholder="6.1235" autofocus name="latitude" />
          </div>
          <div class="p-2 sm:p-4 overflow-y-auto sm:w-2/5">
            <label for="long-label" class="block text-md font-medium mb-2 ">Longitude</label>
            <Field type="text" id="long-label" v-model="currentLongitude"
              class="py-3 px-4 block w-full border-4 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
              placeholder="6.1235" autofocus name="longitude" />
          </div>
          <div class="flex justify-center mt-6 sm:mt-12 overflow-y-auto sm:w-1/5 sm:h-1/3">
            <div class="block text-md font-medium mb-2">
            </div>
            <button @click="fetchCurrentAddress" type="button"
              class="flex-none rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm border-gray-950 font-semibold bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all">
              Auto Fetch
            </button>
          </div>
        </div>

        <div>
          or
        </div>
        <div class="mt-6 flex max-w-md gap-x-4">
          <label for="fetch-map" class="sr-only">
            Location Name
          </label>
          <div class="block w-full">
            <el-select
              class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 py-3 px-4 block w-full border-4 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
              filterable size="default" placeholder="Location/Area" v-model="selectedLocation" name="fetch_map">
              <el-option label="Location/Area: All" value="all" />
              <el-option v-for="(locationArea, index) in  locationAreas " :key="index"
                :label="locationArea.properties.name" :value="locationArea.properties.name" />
            </el-select>
          </div>

        </div>
        <div class="my-12 sm:w-1/6 w-3/5">
          <button type="submit"
            class="tet-lg sm:text-2xl flex justify-center items-center w-full py-2 px-4 border-b-4 border-gray-950 font-semibold bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all ">
            Search
          </button>
        </div>
      </div>
    </Form>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useGeolocation } from '../utils/gmaps';
import { Form, Field } from 'vee-validate';
import { onMounted, ref } from 'vue'
import { useGlobalStore } from "@/stores/global";

const { currentLatitude, currentLongitude, geolocationError, fetchLocationAddress, getCurrentLocation } = useGeolocation();

const router = useRouter();
const globalStore = useGlobalStore();
const locationAreas = ref(null)
const selectedLocation = ref('')

const fetchCurrentAddress = () => {
  if (currentLatitude.value && currentLongitude.value) {
    fetchLocationAddress(currentLatitude.value, currentLongitude.value);
  } else {
    getCurrentLocation()
    if (currentLatitude.value && currentLongitude.value) {
      fetchLocationAddress(currentLatitude.value, currentLongitude.value);
    }
    else {
      console.log('nothing loaded')
    }
    geolocationError.value = 'Current location is not available.';
  }
};


const handleSubmit = function (values) {
  console
  if (values.longitude && values.latitude) {
    router.push({ name: 'search.details.summary', query: { lat: values.latitude, lon: values.longitude } })
  } else if (selectedLocation.value) {

    const locationName = selectedLocation.value;
    router.push({ name: 'search.result', query: { locationName } });
  } else {
    router.push({ name: 'search.result' });
  }
}

onMounted(async () => {

  locationAreas.value = await globalStore.getMergedDataset()
})

</script>
