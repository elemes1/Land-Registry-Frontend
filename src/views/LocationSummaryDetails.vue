<template>
  <div>
    <div v-if="showErrAlert"
      class="animate-pulse w-3/4 sm:my-8 my-4 mx-auto bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
      role="alert">
      <span class="font-bold">The selected property does not any related history to display as the sample dataset does not
        contain one ! Kindly select a new location/property.

      </span>
      <button type="button" @click="$router.go(-1)"
        class="justify-end py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Click to go back
      </button>
    </div>
    <div class="mt-8 sm:mt-24 mb-12 flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:flex-none">

      <div class="sm:w-10/12 mx-auto w-11/12">
        <h1 class="text-2xl sm:text-3xl font-bold my-6">Information card for property <span class="text-green-800">{{
          locationSummaryData.address || 'Fetching data ...' }} </span> </h1>
        <hr class="border-4 border-green-900 my-12">

        <div class="bg-white p-5 shadow-md rounded">
          <div class="mb-4">
            <h2 class="text-xl font-bold">Summary of leasehold</h2>
            <div class="mt-2">
              <div><strong>Address:</strong> {{ locationSummaryData.address || 'Fetching data ...' }}</div>
              <div><strong>Property description:</strong> {{ locationSummaryData.propertyDescription || 'Fetching data...'
              }}
              </div>
              <div><strong>Mortgage Details:</strong> {{ locationSummaryData.mortgageDetails || 'Fetching data ...' }}
              </div>
              <div><strong>Tenure type:</strong> {{ locationSummaryData.tenureType || 'Fetching data ...' }}</div>
              <div><strong>Owner:</strong> {{ locationSummaryData.owner || 'Fetching data ...' }}</div>
              <div><strong>Last Price: </strong> {{ locationSummaryData.price || 'Fetching data ...' }}</div>
              <div><strong>Easements: </strong> {{ locationSummaryData.easements || 'Fetching data ...' }}</div>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="text-xl font-bold">Restrictive covenants and easements</h2>
            <p class="mt-2">
              There may be other things that affect this property that are not listed here. For more information about the
              records we hold, you should obtain a copy of the register and any documents referred to in the register.
            </p>
            <p class="mt-2 font-semibold">
              To understand more about how this information affects the property, you should consider taking legal advice.
            </p>
            <div class="mt-4">
              <strong>Item:</strong> Restrictive covenants
              <div class="text-green-800 font-bold italic">
                {{ locationSummaryData.restrictiveCovenants || 'Fetching data ...' }}
              </div>
              <div class="ml-1"><strong>Recorded:</strong> Yes - for more information, you should buy the Title register.
                This costs 3000 Naira.</div>
            </div>
          </div>
        </div>


      </div>
      <div class="sm:w-7/12 mx-auto w-11/12">
        <h1 class="text-2xl sm:text-3xl font-bold my-6">Property History</h1>
        <hr class="border-4 border-green-900 sm:my-12 my-6">
        <p class="text-md border-green-900 my-6">
          Please click any of the history to verify the details
        </p>
        <div class="bg-white p-5 shadow-md rounded">
          <PropertyTimeline v-for="(timeline, index) in locationSummaryData.transactionHistory" :key="index"
            :history="timeline" />
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import PropertyTimeline from "../components/PropertyTimeline.vue"

const globalStore = useGlobalStore();
const locationDetails = ref([])
const locationSummaryData = ref([])

const route = useRoute();
const locationId = computed(() => route.params.recId)
const query = computed(() => route.query)
const headerName = ref("")
const propertyPrice = ref("")
const showErrAlert = ref(false)


onMounted(async () => {
  try {
    locationSummaryData.value = await globalStore.getLocationSummaryData(query.value.lat, query.value.lon)
    const dataset = await globalStore.getMergedDataset();

    locationDetails.value = dataset.find(item => item.properties.global_id == locationId.value)
    headerName.value = `${locationSummaryData.value.address} [${locationSummaryData.value.coordinates.latitude} - ${locationSummaryData.value.coordinates.latitude}]`;
    propertyPrice.value = new Intl.NumberFormat().format(locationSummaryData.value.price)
  } catch (err) {
    showErrAlert.value = true
  }
})
</script>
