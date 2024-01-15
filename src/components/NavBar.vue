<template>
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-4">
        <nav class="max-w-[85rem]  w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
            <div class="flex items-center justify-between">
                <a href="/">
                    <div class="grid grid-cols-2 gap-1 w-1/3 sm:w-1/4">
                        <div class="">
                            <img src="../assets/img/nigeria-logo.png" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span class="flex-none sm:text-6xl text-white font-bold text-white ">LandDLT</span>
                            <span class="text-white text-lg font-semibold">NG</span>
                        </div>
                    </div>
                </a>

                <div class="sm:hidden">
                    <button type="button"
                        class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/[.25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        data-hs-collapse="#navbar-dark" aria-controls="navbar-dark" aria-label="Toggle navigation">
                        <svg class="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg class="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="navbar-dark"
                class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block ">
                <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5 text-white">
                    <router-link class="text-green-800" :to="{ name: 'admin.properties.index' }">
                        <button type="button"
                            class="flex justify-center items-center align-middle bg-green-700 px-4 py-2 hover:bg-white hover:text-green-700">
                            <span class="mr-2 text-xl font-semibold text-white text-nowrap">Navigate To Admin</span>
                        </button>
                    </router-link>
                    <button type="button" data-hs-overlay="#quick-search-modal" @click="openModal"
                        class="flex justify-center items-center align-middle bg-green-700 px-4 py-2 hover:bg-white hover:text-green-700">
                        <span class="mr-2 text-xl font-semibold">Quick Search</span>
                        <span>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                height="30" viewBox="0 0 50 50">
                                <path
                                    d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z">
                                </path>
                            </svg>
                        </span>
                    </button>


                    <div id="quick-search-modal"
                        class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                        <div
                            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <Form :validation-schema="validationSchema" @submit="handleSearch">
                                <div
                                    class="flex flex-col bg-white border shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                        <h3 class="font-bold text-gray-800 dark:text-white">
                                            Quick Search (Enter location coordinates)
                                        </h3>
                                        <button type="button"
                                            class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                            @click="closeModal">
                                            <span class="sr-only">Close</span>
                                            <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex">
                                        <div class="p-4 overflow-y-auto w-1/2">
                                            <Field name="latitude" type="text" placeholder="Enter latitude e.g 6.1235"
                                                class="py-3 px-4 block w-full border-gray-400 text-gray-800 text-sm focus:border-green-500 focus:ring-green-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                            <ErrorMessage name="latitude" />
                                        </div>
                                        <div class="p-4 overflow-y-auto w-1/2">
                                            <Field name="longitude" type="text" placeholder="Enter longitude e.g 6.1235"
                                                class="py-3 px-4 block w-full border-gray-400 text-gray-800 text-sm focus:border-green-500 focus:ring-green-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                            <ErrorMessage name="longitude" />
                                        </div>
                                    </div>
                                    <div
                                        class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                        <button type="button"
                                            class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                            @click="closeModal">
                                            Cancel
                                        </button>
                                        <button type="submit"
                                            class="py-3 px-4 inline-flex justify-center items-center gap-2 border border-transparent font-semibold bg-green-700 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                </div>


            </div>
        </nav>
    </header>
</template>

<script setup>
import { HSOverlay } from '@preline/overlay';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';

const router = useRouter();
const validationSchema = Yup.object().shape({
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required')
});

const openModal = function () {
    HSOverlay.open(document.querySelector('#quick-search-modal'));
}
const closeModal = function () {
    HSOverlay.close(document.querySelector('#quick-search-modal'));
}

const handleSearch = function (values) {
    closeModal();
    router.push({ name: 'search.details.summary', query: { lat: values.latitude, lon: values.longitude } })
}
</script>
