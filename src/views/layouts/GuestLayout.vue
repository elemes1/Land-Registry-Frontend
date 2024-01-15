<script setup>
import NavBar from '../../components/NavBar.vue'
import PageFooter from '../../components/PageFooter.vue'
import { useGlobalStore } from "@/stores/global";
import { computed, onMounted, onBeforeMount, ref } from "vue";

const open = ref(true)
const store = useGlobalStore();

onBeforeMount(() => {
  store.initializeSessionCode();

})


onMounted(() => {
  const sessionCode = computed(() => localStorage.getItem('sessionCode'));
  const customData = {
    'sessionID': localStorage.getItem('sessionCode')
  }
  window._loq = window._loq || []
  window._loq.push(['custom', customData])
  console.log('lucky Cus Code', window._loq, localStorage.getItem('sessionCode'))

})



</script>


<template>
  <div class="">
    <NavBar />
    <div class="">
      <router-view />
    </div>

    <PageFooter />
  </div>
</template>
