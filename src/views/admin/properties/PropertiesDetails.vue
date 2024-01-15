<template>
  <div class="">
    <ToastAlert v-if="showAlert" :alertText="showAlertText" />
    <div class="flex justify-end w-full">
      <div class="hs-dropdown relative inline-flex">
        <button id="actions-dropdown" type="button"
          class="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-0 border border-green-800 border-2 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
          Actions
          <svg class="hs-dropdown-open:rotate-180 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 min-w-[15rem] bg-white shadow-md rounded-0 p-2"
          aria-labelledby="actions-dropdown">
          <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-0 text-sm text-green-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            href="#" data-hs-overlay="#sell-land-modal" @click="openSellLandModal">
            Sell Land
          </a>
          <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-0 text-sm text-green-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            href="#" data-hs-overlay="#transfer-land-modal" @click="openTransferLandModal">
            Transfer Ownership
          </a>
        </div>
      </div>
    </div>
    <div class="mt-8 sm:mt-24 mb-12 flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:flex-none">
      <div class="sm:w-10/12 w-11/12 mx-auto">
        <h1 class="text-2xl sm:text-3xl font-bold my-6">
          Information card for property
          <span class="text-green-800">{{ propertyDetails.address || 'Fetching data ...' }} </span>
        </h1>
        <hr class="border-4 border-green-900 sm:my-12 my-6" />

        <div class="bg-white p-5 shadow-md rounded">
          <div class="mb-4">
            <h2 class="text-xl font-bold">Summary of leasehold</h2>
            <div class="mt-2">
              <div>
                <strong>Address:</strong> {{ propertyDetails.address || 'Fetching data ...' }}
              </div>
              <div>
                <strong>Property description:</strong>
                {{ propertyDetails.propertyDescription || 'Fetching data ...' }}
              </div>
              <div>
                <strong>Mortgage Details:</strong>
                {{ propertyDetails.mortgageDetails || 'Fetching data ...' }}
              </div>
              <div>
                <strong>Tenure type:</strong>
                {{ propertyDetails.tenureType || 'Fetching data ...' }}
              </div>
              <div><strong>Owner:</strong> {{ propertyDetails.owner || 'Fetching data ...' }}</div>
              <div>
                <strong>Last Price: </strong> {{ propertyDetails.price || 'Fetching data ...' }}
              </div>
              <div>
                <strong>Easements: </strong>
                {{ propertyDetails.easements || 'Fetching data ...' }}
              </div>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="text-xl font-bold">Restrictive covenants and easements</h2>
            <p class="mt-2">
              There may be other things that affect this property that are not listed here. For more
              information about the records we hold, you should obtain a copy of the register and
              any documents referred to in the register.
            </p>
            <p class="mt-2 font-semibold">
              To understand more about how this information affects the property, you should
              consider taking legal advice.
            </p>
            <div class="mt-4">
              <strong>Item:</strong> Restrictive covenants
              <div class="text-green-800 font-bold italic">
                {{ propertyDetails.restrictiveCovenants || 'Fetching data ...' }}
              </div>
              <div class="ml-1">
                <strong>Recorded:</strong> Yes - for more information, you should buy the Title
                register. This costs 3000 Naira.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:w-7/12 mx-auto w-11/12">
        <h1 class="text-2xl sm:text-3xl font-bold my-6">Property History</h1>

        <hr class="border-4 border-green-900 sm:my-12 my-6" />
        <p class="text-md border-green-900 my-6">
          Please click any of the history to verify the details
        </p>
        <div class="bg-white p-5 shadow-md rounded">

          <PropertyTimeline v-for="(timeline, index) in propTimeline" :key="index" :history="timeline" />
        </div>
      </div>
    </div>

    <div class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
      <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5 text-green-800">
        <!-- Sell Land Modal -->
        <div id="sell-land-modal"
          class="hs-overlay hidden w-full h-full fixed top-0 z-[60] overflow-x-hidden overflow-y-auto">
          <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <Form :validation-schema="landSaleValidationSchema" @submit="handleSellLandSubmit" class="w-11/12 mx-auto">
              <div class="flex flex-col bg-white border shadow-sm">
                <div class="flex justify-between items-center py-3 px-4 border-b">
                  <h3 class="font-bold text-green-800">Enter Land sales details</h3>
                  <button type="button"
                    class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#sell-land-modal">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <div class="flex flex-col p-4">
                  <div class="pb-4 overflow-y-auto w-full">
                    <label for="buyerFirstname" class="block text-md font-medium mb-2">Buyer Firstname:</label>
                    <Field type="text" id="buyerFirstname"
                      class="text-gray-800 h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter firstname of buyer" autofocus name="buyerFirstname" />
                  </div>
                  <div class="pb-4 overflow-y-auto w-full">
                    <label for="buyerLastname" class="block text-md font-medium mb-2">Buyer Lastname:</label>
                    <Field type="text" id="buyerLastname"
                      class="text-gray-800 h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter lastname of buyer" autofocus name="buyerLastname" />
                  </div>
                  <div class="pb-4 overflow-y-auto w-full">
                    <label for="price" class="block text-md font-medium mb-2">Price:</label>
                    <Field type="number" id="price"
                      class="text-gray-800 h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter land sale price" autofocus name="price" />
                  </div>
                </div>
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                  <button type="button"
                    class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#sell-land-modal">
                    Cancel
                  </button>
                  <button type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 border border-transparent font-semibold bg-green-700 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <!-- Transfer land Modal -->
        <div id="transfer-land-modal"
          class="hs-overlay hidden w-full h-full fixed top-0 z-[60] overflow-x-hidden overflow-y-auto">
          <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <Form :validation-schema="transferValidationSchema" @submit="handleTransferLandSubmit"
              class="w-11/12 mx-auto">
              <div class="flex flex-col bg-white border shadow-sm">
                <div class="flex justify-between items-center py-3 px-4 border-b">
                  <h3 class="font-bold text-green-800 text-2xl">Enter Land transfer details</h3>
                  <button type="button"
                    class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#transfer-land-modal">
                    <span class="sr-only">Close</span>
                    <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <div class="flex flex-col p-4">
                  <div class="pb-4 overflow-y-auto w-full">
                    <label for="receiverFirstname" class="block text-md font-medium mb-2">Receiver Firstname:</label>
                    <Field type="text" id="receiverFirstname"
                      class="text-gray-800 h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter firstname of buyer" autofocus name="receiverFirstname" />
                  </div>
                  <div class="pb-4 overflow-y-auto w-full">
                    <label for="receiverLastname" class="block text-md font-medium mb-2">Receiver Lastname:</label>
                    <Field type="text" id="receiverLastname"
                      class="text-gray-800 h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter lastname of buyer" autofocus name="receiverLastname" />
                  </div>
                </div>
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                  <button type="button"
                    class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#transfer-land-modal">
                    Cancel
                  </button>
                  <button type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 border border-transparent font-semibold bg-green-700 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HSOverlay } from '@preline/overlay'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import PropertyTimeline from '@/components/PropertyTimeline.vue'
import ToastAlert from '@/components/admin/ToastAlert.vue'

const globalStore = useGlobalStore()

const propertyDetails = ref([])
const propertyId = computed(() => atob(route.params.propertyId))
const propTimeline = ref([])

const route = useRoute()
const headerName = ref('')
const propertyPrice = ref('')
const showAlert = ref(false)
const showAlertText = ref('')

const landSaleValidationSchema = Yup.object().shape({
  buyerFirstname: Yup.string().required('Firstname is required'),
  buyerLastname: Yup.string().required('Lastname is required'),
  price: Yup.number().required('Price is required')
})

const transferValidationSchema = Yup.object().shape({
  receiverFirstname: Yup.string().required('Firstname is required'),
  receiverLastname: Yup.string().required('Lastname is required')
})

onMounted(async () => {
  propertyDetails.value = await globalStore.getSingleLandRecordData(propertyId.value)

  headerName.value = `${propertyDetails.value.address} [${propertyDetails.value.coordinates.latitude} - ${propertyDetails.value.coordinates.latitude}]`
  propertyPrice.value = new Intl.NumberFormat().format(propertyDetails.value.price)
  propTimeline.value = propertyDetails.value.transactionHistory.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
})

const openSellLandModal = function () {
  HSOverlay.open(document.querySelector('#sell-land-modal'))
}
const closeSellLandModal = function () {
  console.log('hello', HSOverlay)
  HSOverlay.close(document.getElementById('sell-land-modal'))
}
const openTransferLandModal = function () {
  HSOverlay.open(document.querySelector('#transfer-land-modal'))
}
const closeTransferLandModal = function () {
  HSOverlay.close(document.querySelector('#transfer-land-modal'))
}

const handleSellLandSubmit = async (values) => {
  const data = {
    landId: propertyId.value,
    buyerName: values.buyerLastname + ' ' + values.buyerFirstname,
    price: values.price.toString()
  }

  let result = await globalStore.sellLand(data)

  showAlertText.value = result
  showAlert.value = true
  closeSellLandModal()
  window.location.reload()
  setTimeout(() => {
    ; (showAlert.value = false), (showAlertText.value = '')
  }, 3000)
}

const handleTransferLandSubmit = async (values) => {
  const data = {
    landId: propertyId.value,
    receiverName: values.receiverLastname + ' ' + values.receiverFirstname
  }

  let result = await globalStore.transferLand(data)
  showAlertText.value = result
  showAlert.value = true
  closeTransferLandModal()
  window.location.reload()
  setTimeout(() => {
    ; (showAlert.value = false), (showAlertText.value = '')
  }, 3000)
}
</script>
