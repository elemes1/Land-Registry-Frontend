<template>
  <div>
    <admin-sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <div class="px-4 md:px-10 mx-auto w-full m-16">
        <router-view />
      </div>
      <!-- <footer-admin /> -->
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../../components/admin/SideBar.vue'
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'


import { useGlobalStore } from "@/stores/global";
import { computed, onMounted, ref } from "vue";

const open = ref(true)
const store = useGlobalStore();

onMounted(() => {
  store.initializeSessionCode();
  console.log('admin La', localStorage.getItem('sessionCode'))

})

const sessionCode = computed(() => localStorage.getItem('sessionCode'));

const customData = {
  'sessionID': sessionCode
}
window._loq = window._loq || []
window._loq.push(['custom', customData])

console.log('lucky Cus Code', window._loq)

</script>
