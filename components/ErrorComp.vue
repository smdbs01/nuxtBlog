<!-- eslint-disable vue/html-indent -->
<template>
  <div class="absolute left-0 top-0 flex size-full items-center justify-center text-gray-100">
    <div class="m-auto flex max-w-3xl flex-col items-center justify-center gap-4">
      <span class="text-3xl">😣 Oopsiee~ Something went wrong 😣</span>
      <span class="text-3xl"> <span class="font-bold ">Message: </span> {{ message }} </span>
      <span class="text-3xl"> <span class="font-bold ">Status: </span>{{ status }} </span>
      <NuxtLink
        to="/"
        class="mt-2 border-b-2 border-gray-500 text-2xl uppercase tracking-wider text-gray-100 transition-colors hover:border-green-500 hover:text-green-400"
      >
        Go back to home
      </NuxtLink>
      <span class="mt-2 text-xl">If you believe this is an error, please <NuxtLink
          to="/about"
          class="border-b-2 border-gray-500 transition-colors hover:border-green-500 hover:text-green-400"
        >contact</NuxtLink>
        us.</span>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  message: string,
  status: number
}>()

</script>

<style scoped></style>