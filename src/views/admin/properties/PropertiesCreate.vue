<template>
  <div>
    <div class="page-header flex flex-row justify-between mb-8">
      <div class="text-xl font-bold text-green-800">
        <span class="inline-block align-middle">Provide new property details correctly</span>
      </div>
    </div>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-0">
      <div class="block w-full">
        <Form @submit="handleSubmit" :validation-schema="validationSchema">
          <div
            class="flex flex-col w-11/12 sm:w-4/5 min-w-3/5 mx-auto shadow-b-md border-gray-950 shadow-sm sm:p-4 p-2 md:p-5 mb-24 mt-12 items-center">
            <div class="grid grid-cols-2 gap-x-4 w-full">
              <div class="pb-4 overflow-y-auto">
                <label for="firstname" class="block text-md font-medium mb-2">Owner Firstname</label>
                <Field type="text" id="firstname"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter property first name e.g., John" autofocus name="firstname" />
                <ErrorMessage class="text-red-600" name="firstname" />
              </div>
              <div class="pb-4 overflow-y-auto">
                <label for="lastname" class="block text-md font-medium mb-2">Owner Lastname</label>
                <Field type="text" id="lastname"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter property owner lastname e.g., Doe" autofocus name="lastname" />
                <ErrorMessage class="text-red-600" name="lastname" />
              </div>
            </div>
            <div class="pb-4 overflow-y-auto w-full">
              <label for="description" class="block text-md font-medium mb-2">Description</label>
              <Field type="text" id="description"
                class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Describe the property" autofocus name="description" />
              <ErrorMessage class="text-red-600" name="description" />
            </div>

            <div class="grid grid-cols-2 gap-x-4 w-full">
              <div class="pb-4 overflow-y-auto">
                <label for="latitude" class="block text-md font-medium mb-2">Latitude</label>
                <Field type="text" id="latitude"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="6.1235" autofocus name="latitude" />
                <ErrorMessage class="text-red-600" name="latitude" />
              </div>
              <div class="pb-4 overflow-y-auto">
                <label for="longitude" class="block text-md font-medium mb-2">Longitude</label>
                <Field type="text" id="longitude"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="6.1235" autofocus name="longitude" />
                <ErrorMessage class="text-red-600" name="longitude" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-x-4 w-full">
              <div class="pb-4 overflow-y-auto">
                <label for="price" class="block text-md font-medium mb-2">Price</label>
                <Field type="number" id="price"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter property price" autofocus name="price" />
                <ErrorMessage class="text-red-600" name="price" />
              </div>
              <div class="pb-4 overflow-y-auto">
                <label for="tenureType" class="block text-md font-medium mb-2">Tenure Type</label>
                <Field type="text" id="tenureType"
                  class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter tenure type e.g., Leasehold" autofocus name="tenureType" />
                <ErrorMessage class="text-red-600" name="tenureType" />
              </div>
            </div>
            <div class="pb-4 overflow-y-auto w-full">
              <label for="address" class="block text-md font-medium mb-2">Address</label>
              <Field type="text" id="address"
                class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter property address" autofocus name="address" />
              <ErrorMessage class="text-red-600" name="address" />
            </div>
            <div class="pb-4 overflow-y-auto w-full">
              <label for="mortgageDetails" class="block text-md font-medium mb-2">Mortgage Details</label>
              <Field type="text" id="mortgageDetails"
                class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter property mortgage details" autofocus name="mortgageDetails" />
              <ErrorMessage class="text-red-600" name="mortgageDetails" />
            </div>
            <div class="pb-4 overflow-y-auto w-full">
              <label for="easement" class="block text-md font-medium mb-2">Easement</label>
              <Field type="text" id="easement"
                class="h-10 py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter property mortgage details" autofocus name="easement" />
              <ErrorMessage class="text-red-600" name="easement" />
            </div>
            <div class="pb-4 overflow-y-auto w-full">
              <label for="covenants" class="block text-md font-medium mb-2">Covenants</label>
              <Field
                class="py-3 px-4 block w-full border-2 border-gray-900 text-sm focus:border-green-500 focus:ring-green-500"
                as="textarea" name="covenants" id="covenants" placeholder="Enter covenant and easement details" cols="30"
                rows="10" />
              <ErrorMessage class="text-red-600" name="covenants" />
            </div>

            <div class="my-12 w-3/5">
              <button type="submit"
                class="text-md flex justify-center items-center w-full py-2 px-4 border-b-4 border-gray-950 font-semibold bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all">
                <span class="mr-2"><i class="fa fa-solid fa-paper-plane"></i></span>
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'

const globalStore = useGlobalStore()
const router = useRouter()
const validationSchema = Yup.object().shape({
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),
  firstname: Yup.string().required('Firstname is required'),
  lastname: Yup.string().required('Lastname is required')
})

const handleSubmit = async function (values) {
  const data = {
    landId: `${values.latitude}-${values.longitude}`,
    latitude: values.latitude,
    longitude: values.longitude,
    owner: values.firstname + ' ' + values.lastname,
    address: values.address,
    price: values.price.toString(),
    tenureType: values.tenureType,
    easement: values.easement,
    covenants: values.covenants,
    mortgageDetails: values.mortgageDetails,
    description: values.description
  }

  const result = await globalStore.createLand(data)

  console.log(result)
  router.push({ name: 'admin.properties.index' })
}
</script>
