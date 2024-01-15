<script setup>
import NavBar from './components/NavBar.vue'
import PageFooter from './components/PageFooter.vue'
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
