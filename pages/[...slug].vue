<template>
  <ErrorComp
    :message="$route.path + ' not found'"
    :status="404"
  />
</template>

<script setup>
definePageMeta({
  auth: false
})

</script>