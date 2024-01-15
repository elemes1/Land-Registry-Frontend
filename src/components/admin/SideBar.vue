<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        <span
          class="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-800 font-semibold text-white leading-none mr-3"
        >
          AD
        </span>
        <span>Admin</span>
      </router-link>
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                LAND LT
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link to="/admin/properties" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-green-800 hover:text-green-700'
                    : 'text-blueGray-700 hover:text-blueGray-500'
                ]"
              >
                <i
                  class="fas fa-table mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Properties
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      collapseShow: 'hidden'
    }
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes
    }
  }
}
</script>
