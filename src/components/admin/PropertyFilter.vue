<template>
  <div class="w-full h-full space-y-6">
    <div class="grid grid-cols-1 gap-6">
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

const emit = defineEmits(['applyFilter', 'clearFilter'])
const processFilter = () => {
  if (selectedRegion.value) {
    emit('applyFilter', {
      regions: selectedRegion.value === 'all' ? '' : selectedRegion.value
    })
  }
}

onMounted(() => {
  regions.value = globalStore.regions()
})
</script>
