<template>
  <div>
    Image
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "auth",
    "admin",
  ],
  layout: "admin"
})
</script>