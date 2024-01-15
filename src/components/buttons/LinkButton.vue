<template>
    <a :href="link">
        <button type="button"
            class="text-sm w-full md:w-1/3 py-2 px-4 border border-0 border-b-2 border-black font-bold bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all ">
            <div :class="`text-${fontSize} flex justify-center items-center p-0 m-0`">
                {{ text }}

                <span class="ml-2">
                    <slot name="icon"></slot>
                </span>
            </div>
        </button>
    </a>
</template>

<script setup>
const props = defineProps({
    text: String,
    link: String,
    color: String,
    fontSize: {
        type: String,
        default: '3xl'
    }

});


</script>