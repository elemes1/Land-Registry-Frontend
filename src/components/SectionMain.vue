<template>
    <div class="flex flex-col mb-5">
        <header
            :class="`font-bold mb-3 ${isMainSectionContent ? 'text-2xl/loose' : 'text-xl/loose'} ${isMainSectionContent ? 'md:text-3xl/loose' : 'md:text-2xl/loose'} antialiased`">
            <slot name="header"></slot>
        </header>
        <div class="font-small antialiased text-xl md:text-2xl inline-block align-middle">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    isMainSectionContent: {
        type: Boolean,
        default: true
    }
});

</script>
