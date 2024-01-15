<template>
  <!-- Timeline -->
  <div>
    <div>

      <TransitionRoot as="template" :show="openVerificationWindow">
        <Dialog as="div" class="relative z-10" @close="openVerificationWindow = false">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel
                  class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Verify On Blockchain ?
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          When you click on the 'Verify' button, you will be taken to a special website known as a
                          blockchain explorer.
                          This site allows you to see detailed information about the transaction you're interested in.
                          Think of it like a public record that shows the details and status of your transaction on the
                          blockchain, which is a kind of digital ledger.
                          <br />
                          As you click 'Verify', the unique identifier for your transaction, known as the transaction ID,
                          will be automatically saved to your computer's clipboard.
                          This is a bit like copying a piece of text. You can then easily paste this ID (by right-clicking
                          and selecting 'Paste' or using Ctrl+V on your keyboard) into a search box on the blockchain
                          explorer's main page.
                          This action will bring up all the specifics about your transaction, such as its current status,
                          its history, and confirmations that it's a valid transaction on the blockchain.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button type="button"
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      @click="copyAndRedirect">Verify</button>
                    <button type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      @click="openVerificationWindow = false" ref="cancelButtonRef">Cancel</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
    <!-- Heading -->
    <div class="ps-2 my-2 first:mt-0">
      <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-green-800">
        {{ datetime }}
      </h3>
    </div>
    <!-- End Heading -->

    <!-- Item -->
    <div @click="openVerificationWindow = true"
      class="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
      <a class="absolute inset-0 z-[1]" href="#"></a>

      <!-- Icon -->
      <div
        class="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700 dark:group-hover:after:bg-gray-600">
        <div class="relative z-10 w-7 h-7 flex justify-center items-center">
          <div
            class="w-2 h-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-gray-800 dark:border-gray-600">
          </div>
        </div>
      </div>
      <!-- End Icon -->

      <!-- Right Content -->
      <div class="grow p-2 pb-8">
        <h3 class="flex gap-x-1.5 font-semibold text-green-800">
          <svg class="flex-shrink-0 w-4 h-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>
          {{ history?.details || "Land Sale" }}
        </h3>
        <p class="mt-1 text-sm">
          Action: {{ history.transactionType }}
        </p>
        <p v-if="history.transactionType === 'SellLand'" class="mt-1 text-sm">
          Sale Price: {{ salePrice }}
        </p>
        <button type="button"
          class="mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          New Owner: <img class="flex-shrink-0 w-4 h-4 rounded-full"
            src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
            alt="Image Description">
          {{ history.newOwner }}
        </button>
      </div>
      <!-- End Right Content -->
    </div>
    <!-- End Item -->
  </div>
  <!-- End Timeline -->
</template>

<script setup>
import { computed } from 'vue';
import { helper } from '../utils/helper';
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
const openVerificationWindow = ref(false)
const props = defineProps({
  history: {
    type: Object,
    required: true,
    default: null
  }
})
// const explorerUrl = 'http://transactsphere.xyz:8080/?tab=transactions&transId=';
const explorerUrl = 'http://transactsphere.xyz:8080';
const datetime = computed(() => helper.formatTimestamp(props.history?.date))
const salePrice = computed(() => props.history.transactionType == 'SellLand' ? new Intl.NumberFormat().format(props.history.salePrice) : 'N/A');
const copyAndRedirect = async () => {

  try {
    // Copying to clipboard
    await navigator.clipboard.writeText(props.history.transactionId);
    alert('Transaction ID copied to clipboard.');
    // let explorerTransUrl = explorerUrl + props.history.transactionId;
    let explorerTransUrl = explorerUrl
    // Redirecting in a new tab
    window.open(`${explorerTransUrl} `, '_blank');
    this.openVerificationWindow = false;
  } catch (error) {
    console.error('Failed to copy transaction ID:', error);
  }
};
</script>
