<template>
  <div class="bg-gray-100 w-full p-2 rounded-2 shadow-md transition-all hover:shadow-lg hover:bg-coolGray-200" to="/">
    <!-- Title -->
    <div>
      <NuxtLink :to="'/post/' + post.id"
        class="text-xl font-semibold transition-all border-b-(2 gray-300) hover:border-gray-500">
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

<script setup>
import { posts } from '~/server/db/schema';

const props = defineProps({
  post: posts
})

</script>
