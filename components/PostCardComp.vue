<template>
  <div
    class="rounded-2 hover:bg-coolGray-200 w-full bg-gray-100 p-2 shadow-md transition-all hover:shadow-lg"
    to="/"
  >
    <!-- Title -->
    <div>
      <NuxtLink
        :to="'/post/' + post.id"
        class="border-b-(2 gray-300) text-xl font-semibold transition-all hover:border-gray-500"
      >
        {{ post.title }}
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="mt-2">
      {{ String(post.id) + " " + (post.content.length > 200 ? post.content.substring(0, 300) + "..." : post.content) }}
    </div>

    <!-- Time -->
    <div class="mt-2 text-right text-sm">
      <div>
        Created at:
        <span class="font-mono">
          {{ parseDateTimeString(post.createdDate) }}
        </span>
      </div>
      <div v-if="post.updatedDate !== post.createdDate">
        Updated at:
        <span class="font-mono">
          {{ parseDateTimeString(post.updatedDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import z from 'zod'

const postZ = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdDate: z.string(),
  updatedDate: z.string(),
})

const props = defineProps<{
  post: z.infer<typeof postZ>
}>()

</script>
