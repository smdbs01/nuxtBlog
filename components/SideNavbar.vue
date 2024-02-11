<template>
  <nav class="flex flex-col items-center bg-gray-700">
    <ul class="w-full flex flex-col gap-1 pt-4">
      <li
        v-for="{ tabName, url, icon } in tabs"
        :key="url"
        class="h-12 w-full flex items-center px-4"
      >
        <NuxtLink
          :to="url"
          class="group size-full flex items-center rounded-lg focus:bg-gray-500 hover:bg-gray-500 focus:outline-none"
        >
          <div
            class="mx-3 size-8 bg-gray-200 group-focus:bg-green-400 group-hover:bg-green-400"
            :class="icon"
          />
          <span
            class="hidden text-lg text-gray-100 font-black tracking-wider md:inline group-focus:text-green-400 group-hover:text-green-400"
          >
            {{ tabName }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

defineProps<{
  tabs: { tabName: string, url: string, icon: string }[]
}>()


</script>

<style scoped>
nav a.router-link-active>* {
  @apply text-green-500;
}

nav a.router-link-active>div {
  @apply bg-green-500;
}
</style>