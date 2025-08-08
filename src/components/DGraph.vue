<template>
    <div class="graphic-wrapper">
        <apexchart height="83%" width="100%" type="area" :options="options" :series="series"></apexchart>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    options: {
        type: Object,
        required: true
    },
    series: {
        type: Array,
        required: true,
        default: () => ([])
    }
});
</script>

<style scoped>
.graphic-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    overflow: visible;
}

.apexcharts-tooltip {
  z-index: 9999 !important;
}

@media (max-width: 768px) {
    .graphic-wrapper {
        transform: scale(0.8);
    }
}
</style>