<template>
  <div>
    <div
      class="h-[500px] sm:h-[700px] text-white text-center grid bg-cover bg-no-repeat bg-[75%] bg-[url('https://landsprout.com/wp-content/uploads/2023/07/best-places-to-invest-in-real-estate-in-nigeria-scaled.jpg')]">



      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
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
                  class="my-auto transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-4xl relative transform sm:overflow-none rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-4xl sm:my-12 sm:h-80vlg:w-5xl sm:max-w-7xl sm:max-h-full h-80 min-h-64 md:min-h-64">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div
                        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Important Information
                        </DialogTitle>

                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Before You Begin, Please copy or note your session code and read the following instruction
                            below
                          </p>
                        </div>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Your unique session code for the survey is:
                            <span class="text-xl text-black font-bold">
                              {{ sessionCode }}
                            </span>
                          </p>

                        </div>



                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            <span class="text-md  text-red-700 underline">
                              Note for PoC Users:
                            </span>



                            Welcome to the prototype of the blockchain-powered land registry system. This proof of concept
                            (POC) is designed to showcase the fundamental operations of blockchain in land registry
                            contexts. Please note that the data loaded here, including various land transactions, is
                            purely for demonstration purposes and not representative of real transactions.

                            You are invited to explore features such as land search, simulate basic land transactions, and
                            verify records. These tasks are integral to understanding the system's functionality.

                            After interacting with the PoC, we kindly ask you copy the session code for the survey and
                            return to the survey to share your feedback. Your insights are invaluable and will contribute
                            significantly to our research.

                            Thank you for your participation!

                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      @click="open = false" ref="cancelButtonRef">I understand. Please Continue</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>


      <div class="col-start-1 row-start-1 bg-green-800 bg-opacity-75 w-full h-full"></div>
      <div class="col-start-1 row-start-1 mx-auto my-auto">
        <h1 class="text-4xl md:text-6xl mx-auto font-bold my-12 w-2/3 sm:w-4/5">
          Search for land and property information
        </h1>
        <div class="container-fluid">
          <a class="blue-row mb-4 text-lg md:text-2xl font-normal md:font-semibold" rel="noopener noreferrer"
            href="#get_started">
            <h4> Find information about a property in Nigeria, even if you do not own it. <br />
              <span>&#8595;</span>
            </h4>

          </a>
        </div>

      </div>
    </div>
    <div class="text-wrap text-center justify-center items-center">
      <div class="col-span-2 text-xl md:text-2xl">

        <SectionMain>
          <template #header>
            <h1 class="text-green-800 text-4xl mt-12">What you can get</h1>
          </template>
          <template #content>
            <p class="mb-4">
              You can download copies of the property summary, title plan and title register for a
              property in the service.
            </p>
          </template>
        </SectionMain>
        <SectionMain :isMainSectionContent="false">
          <template #header>
            <h1>Get a property summary</h1>
          </template>
          <template #content>
            <p class="mb-4">The property summary includes:</p>
            <ul
              class="items-center gap-x-12 mx-auto space-y-3 text-xs md:text-sm mb-4 md:grid md:grid-rows-3 md:grid-flow-col w-4/5 text-left">
              <li class="flex space-x-3">
                <svg class="flex-shrink-0 h-10 w-10 text-green-500" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                    fill="currentColor" fill-opacity="0.1" />
                  <path
                    d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                    fill="currentColor" />
                </svg>
                <span class="text-2xl">
                  the property’s address - the address held by Land Registry Bureau
                </span>
              </li>
              <li class="flex space-x-3">
                <svg class="flex-shrink-0 h-10 w-10 text-green-500" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                    fill="currentColor" fill-opacity="0.1" />
                  <path
                    d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                    fill="currentColor" />
                </svg>
                <span class="text-2xl"> the property description </span>
              </li>
              <li class="flex space-x-3">
                <svg class="flex-shrink-0 h-10 w-10 text-green-500" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                    fill="currentColor" fill-opacity="0.1" />
                  <path
                    d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                    fill="currentColor" />
                </svg>
                <span class="text-2xl">
                  the ‘tenure type’ - the type of ownership the property has
                </span>
              </li>
              <li class="flex space-x-3">
                <svg class="flex-shrink-0 h-10 w-10 text-green-500" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                    fill="currentColor" fill-opacity="0.1" />
                  <path
                    d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                    fill="currentColor" />
                </svg>
                <span class="text-2xl">
                  whether there are any ‘restrictive covenants’ - promises to not do certain things
                  with the land, like not building on a particular area
                </span>
              </li>
              <li class="flex space-x-3">
                <svg class="flex-shrink-0 h-10 w-10 text-green-500" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z"
                    fill="currentColor" fill-opacity="0.1" />
                  <path
                    d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z"
                    fill="currentColor" />
                </svg>
                <span class="text-2xl">
                  whether there are any ‘easements’ - the rights of one piece of land over another,
                  like a right of way
                </span>
              </li>
            </ul>
          </template>
        </SectionMain>
        <SectionMain>
          <template #content>
            <div id="get_started"
              class="flex flex-col bg-white border-4 mx-6 shadow-b-md border-gray-950 shadow-sm p-4 md:p-5 mb-24 mt-12">
              <h1 class="text-3xl font-bold my-6">Search for a property</h1>

              <p class="mb-4">
                You’ll need to know the approximate latitude and longitude of the location to use
                this service
              </p>

              <LinkButton text="Start now" link="/search-registry">
                <template #icon>
                  <IconAngleRight />
                </template>
              </LinkButton>
            </div>
          </template>
        </SectionMain>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconAngleRight from '../components/icons/IconAngleRight.vue'
import LinkButton from '../components/buttons/LinkButton.vue'
import SectionMain from '../components/SectionMain.vue'
import { useGlobalStore } from "@/stores/global";

import { ref, onMounted, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
const store = useGlobalStore();

onMounted(() => {
  store.initializeSessionCode();
})

const sessionCode = computed(() => localStorage.getItem('sessionCode'));

</script>
<style>

.container-fluid .blue-row h4 {
  color: white;
  font-size: 39px;
  text-align: center;
  vertical-align: center;
  padding: 40px;
  font-weight: bold;
}

.container-fluid .blue-row h4 span {
  margin-bottom: 5%;
  transition: 1s;
}

.container-fluid .blue-row:hover > h4 span {
  margin-bottom: 10%;
}
</style>