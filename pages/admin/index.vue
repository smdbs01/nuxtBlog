<template>
  <div>
    admin
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "admin",
    "auth"
  ],
  layout: "admin"
})
</script>