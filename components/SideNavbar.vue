<template>
  <nav class="flex flex-col items-center bg-gray-700">
    <ul class="flex w-full flex-col gap-1 pt-4">
      <li
        v-for="{ tabName, url, icon } in tabs"
        :key="url"
        class="flex h-12 w-full items-center px-4"
      >
        <NuxtLink
          :to="url"
          class="group flex size-full items-center rounded-lg hover:bg-gray-500 focus:bg-gray-500 focus:outline-none"
        >
          <div
            class="mx-3 size-8 bg-gray-200 group-hover:bg-green-400 group-focus:bg-green-400"
            :class="icon"
          />
          <span
            class="hidden text-lg font-black tracking-wider text-gray-100 group-hover:text-green-400 group-focus:text-green-400 md:inline"
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