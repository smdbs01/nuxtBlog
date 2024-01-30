<template>
  <div>
    admin
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "auth-middleware",
    "auth"
  ]
})
</script>