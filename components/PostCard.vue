<template>
  <NuxtLink
    class="block bg-gray-100 w-full p-2 rounded-2 shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-300"
    to="/">
    <h2 class="text-xl font-semibold">
      {{ title }}
    </h2>
    <div class="mt-2">
      {{ content.length > 200 ? content.substring(0, 300) + "..." : content }}
    </div>
    <div class="mt-2 text-right text-sm">
      <div>
        Created at:
        <span class="font-mono">
          {{ parseDateTimeString(createDate) }}
        </span>
      </div>
      <div v-if="updateDate !== createDate">
        Updated at:
        <span class="font-mono">
          {{ parseDateTimeString(updateDate) }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>

const props = defineProps({
  title: String,
  content: String,
  createDate: String,
  updateDate: String
})

</script>
