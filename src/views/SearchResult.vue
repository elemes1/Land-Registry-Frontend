<template>
    <div class="mt-24 mb-12">
        <div class="w-11/12 mx-auto">
            <div class="page-header flex flex-col sm:flex-row sm:justify-between mb-8">
                <div class="text-xl font-bold text-green-800">
                    <h1 class="text-xl sm:text-3xl font-bold my-6">{{ headerName || 'Fetching data ...' }}</h1>
                </div>
                <div class="sm:w-1/8 flex flex-row justify-end items-end">
                    <div class="mr-6">
                        <span class="font-bold">Filter Records:</span>
                        <LocationFilter @applyFilter="applyFilter" />
                    </div>
                </div>
            </div>
            <hr class="border-4 border-green-900 my-12" />

            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="border-4 border-gray-900 shadow overflow-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="text-sm sm:text-lg text-gray-200 bg-green-800">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left uppercase">Name</th>
                                        <th scope="col" class="px-6 py-3 text-left uppercase">State</th>
                                        <th scope="col" class="px-6 py-3 text-left uppercase">Ward</th>
                                        <th scope="col" class="px-6 py-3 text-left uppercase">Source</th>
                                        <th scope="col" class="px-6 py-3 text-left uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="text-sm sm:text-lg divide-y divide-gray-200 dark:divide-gray-700 text-gray-900">
                                    <tr v-for="nav in paginatedData" :key="nav.id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ nav.properties.name }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ nav.properties.state_code }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ nav.properties.ward_code }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ nav.properties.source }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-center">
                                            <a class="px-4 py-2 text-green-800 hover:text-green-900 border-2 border-gray-900"
                                                :href="`/search-details/${nav.properties.global_id}`">View Details</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Pagination navigation -->
                        <nav class="flex items-center -space-x-px my-6">
                            <button @click="previousPage" :disabled="currentPage === 1"
                                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-0 last:rounded-e-0 border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                <span class="hidden sm:block">Previous</span>
                            </button>

                            <!-- Render page buttons with ellipses -->
                            <template v-for="page in totalPages">
                                <button v-if="shouldDisplayPage(page)" :key="page" @click="goToPage(page)" :class="{
                                    'bg-gray-200': currentPage === page,
                                    'border-gray-200': currentPage !== page
                                }"
                                    class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-0 last:rounded-e-0 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                    {{ page }}
                                </button>

                                <!-- Display ellipses after the first few pages and before the last few pages -->
                                <span v-if="shouldDisplayEllipsisAfter(page)" :key="page">...</span>
                            </template>

                            <button @click="nextPage" :disabled="currentPage === totalPages"
                                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-0 last:rounded-e-0 border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                <span class="hidden sm:block">Next</span>
                                <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>

                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { useRoute } from 'vue-router'
import LocationFilter from '@/components/LocationFilter.vue'

const globalStore = useGlobalStore()
const route = useRoute()
const locationName = computed(() => route.query?.locationName)
const headerName = ref('loading Search Result from location dataset please wait.....')
const filterParams = ref({})
const locationDataSets = ref([])
const navs = ref([])

const pageSize = ref(50)
const currentPage = ref(1)

const totalPages = computed(() => {
    return Math.ceil(locationDataSets.value.length / pageSize.value)
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return navs.value.slice(start, end)
})

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const goToPage = (page) => {
    currentPage.value = page
}
const shouldDisplayPage = (page) => {
    // Display the first two pages, the current page, and the last three pages
    return (
        page === 1 ||
        page === 2 ||
        page === totalPages.value ||
        page === totalPages.value - 1 ||
        (page >= currentPage.value - 1 && page <= currentPage.value + 1)
    )
}

// Check if ellipses should be displayed after a page
const shouldDisplayEllipsisAfter = (page) => {
    // Display ellipses after the first two pages and before the last three pages
    return (
        (page === 3 && currentPage.value > 4) ||
        (page === totalPages.value - 2 && currentPage.value < totalPages.value - 3)
    )
}
onMounted(async () => {
    locationDataSets.value = await globalStore.getMergedDataset()
    navs.value = locationDataSets.value

    if (locationName.value) {
        navs.value = navs.value.filter((nav) =>
            nav.properties.name.toLowerCase().includes(locationName.value.toLowerCase())
        )
        headerName.value = `Search result for locations approximate to ${locationName.value.toUpperCase()}`
    }
})

const applyFilter = async (filters) => {
    filterParams.value = filters
    const dataset = await globalStore.getMergedDataset()

    if (filters.states) {
        locationDataSets.value = dataset.filter((data) => {
            return data.properties.state_code.toLowerCase() == filters.states.toLowerCase()
        })
    }

    if (filters.regions) {
        const regionStates = globalStore.getRegionStates(filters.regions)
        let filterResult = []
        for (const stateData of regionStates) {
            let data = dataset.filter((d) => {
                return d.properties.state_code == stateData.code
            })
            filterResult.push(data)
        }
        locationDataSets.value = filterResult.flat()
    }

    console.log(locationDataSets.value)
    navs.value = locationDataSets.value
}

watch(
    () => [filterParams, currentPage, pageSize, locationDataSets],
    () => {
        // const data = await globalStore.getAllLandRecordsData(pageSize.value, currentPage.value, queryParams.value)
        // properties.value = data.lands.records
    },
    { deep: true }
)
</script>
