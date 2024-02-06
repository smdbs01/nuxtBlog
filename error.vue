<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div class="size-full">
    <ErrorComp
      :message="props.error.message"
      :status="props.error.statusCode"
    />
  </div>
</template>