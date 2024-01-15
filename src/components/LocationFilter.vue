<template>
  <div class="w-full h-full space-y-6">
    <div class="grid grid-cols-2 gap-6">
      <div class="block w-full">
        <el-select class="w-full border border-2 border-green-800 rounded-0" filterable size="default" placeholder="State"
          @change="processFilter" v-model="selectedState">
          <el-option label="State: All" value="all" />
          <el-option v-for="(state, index) in states" :key="index" :label="state.name" :value="state.code" />
        </el-select>
      </div>
      <div class="block w-full">
        <el-select class="w-full border border-2 border-green-800 rounded-0" filterable size="default"
          placeholder="Region" @change="processFilter" v-model="selectedRegion">
          <el-option label="Region: All" value="all" />
          <el-option v-for="(region, index) in regions" :key="index" :label="region.name" :value="region.name" />
        </el-select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

const selectedRegion = ref('all')
const regions = ref([])

const selectedState = ref('all')
const states = ref([])

const emit = defineEmits(['applyFilter', 'clearFilter'])
const processFilter = () => {
  if (selectedRegion.value) {
    emit('applyFilter', {
      regions: selectedRegion.value === 'all' ? '' : selectedRegion.value,
      states: selectedState.value === 'all' ? '' : selectedState.value
    })
  }
  if (selectedState.value) {
    emit('applyFilter', {
      regions: selectedRegion.value === 'all' ? '' : selectedRegion.value,
      states: selectedState.value === 'all' ? '' : selectedState.value
    })
  }
}

onMounted(() => {
  regions.value = globalStore.regions()
  states.value = globalStore.states()
})


</script>
