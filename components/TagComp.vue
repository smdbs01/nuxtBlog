<template>
  <button
    class="rounded-md px-4 py-1 font-semibold transition-all duration-200 active:border-none focus:opacity-60 hover:opacity-60 focus:shadow-none focus:outline-0"
    :style="{ backgroundColor: color }"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">

defineProps<{
  name: string,
  color: string,
}>()

</script>

<style scoped></style>