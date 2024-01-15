<template>
  <div
    class="max-w-xs bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg dark:bg-white/10 dark:border-white/20 dark:text-white"
    role="alert"
  >
    <div class="flex p-4">
      {{ alertText }}

      <div class="ms-auto">
        <button
          type="button"
          class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
        >
          <span class="sr-only">Close</span>
          <svg
            class="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  alertText: {
    type: String
  }
})
</script>
