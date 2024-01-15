<template>
  <div>
    <div class="page-header flex sm:flex-row flex-col sm:justify-between mb-8">
      <div class="text-xl font-bold text-green-800">
        <span class="inline-block align-middle">All Properties</span>
      </div>
      <div class="w-1/8 flex flex-row sm:justify-end items-end">
        <div class="mr-6">
          <span class="font-bold">Filter Records:</span>
          <PropertyFilter @applyFilter="applyFilter" />
        </div>
        <div class="">
          <a href="/admin/properties/create">
            <button type="button"
              class="text-sm py-2 px-4 border border-0 border-b-2 border-black font-bold bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all">
              <i class="fa fa-plus mr-2"></i>
              <span>Create New</span>
            </button>
          </a>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border-4 border-gray-900 shadow">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="text-sm sm:text-lg text-gray-200 bg-green-800">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left uppercase">Owner</th>
                  <th scope="col" class="px-6 py-3 text-left uppercase">Price</th>
                  <th scope="col" class="px-6 py-3 text-left uppercase">Doc Type</th>
                  <th scope="col" class="px-6 py-3 text-left uppercase">Tenure Type</th>
                  <th scope="col" class="px-6 py-3 text-left uppercase">Action</th>
                </tr>
              </thead>
              <tbody class="text-sm sm:text-lg divide-y divide-gray-200 dark:divide-gray-700 text-gray-900">
                <tr v-for="(property) in properties" :key="property.landId">
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ property.owner }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ new Intl.NumberFormat().format(property.price) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap capitalize">
                    {{ property.docType }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ property.tenureType }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <a class="px-4 py-2 text-green-800 hover:text-green-900 border-2 border-gray-900"
                      :href="`/admin/properties/${setPropertyId(property.landId)}`">
                      <i class="fa fa-eye mr-2"></i>
                      <span>View Details</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <nav class="flex items-center -space-x-px my-6">
            <button @click="previousPage" :disabled="currentPage === 1"
              class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-0 last:rounded-e-0 border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span class="hidden sm:block">Previous</span>
            </button>

            <button @click="nextPage"
              class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-0 last:rounded-e-0 border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <span class="hidden sm:block">Next</span>
              <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>

            </button>
          </nav>
          <!-- End Pagination -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGlobalStore } from '@/stores/global'
import PropertyFilter from '@/components/admin/PropertyFilter.vue'

const globalStore = useGlobalStore()
const properties = ref([])
const queryParams = ref({})
const currentBookmark = ref('')

const pageSize = ref(50)
const currentPage = ref(1)

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
const nextPage = async () => {
  const data = await globalStore.getAllLandRecordsData(pageSize.value, queryParams.value, currentBookmark.value)

  console.log(data)
  properties.value = data.lands.records
  currentBookmark.value = data.lands.bookmark
}

onMounted(async () => {
  const data = await globalStore.getAllLandRecordsData(pageSize.value, queryParams.value)
  properties.value = data.lands.records
  currentBookmark.value = data.lands.bookmark
})

const setPropertyId = (id) => {
  return btoa(id)
}

const applyFilter = (filters) => {
  queryParams.value = filters
  pageSize.value = 2000
  currentBookmark.value = ''
}

watch(
  () => [queryParams],
  async () => {
    const data = await globalStore.getAllLandRecordsData(pageSize.value, queryParams.value, currentBookmark.value)
    properties.value = data.lands.records
    currentBookmark.value = data.lands.bookmark

  },
  { deep: true }
)
</script>
