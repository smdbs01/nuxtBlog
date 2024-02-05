<template>
  <div class="rounded-2 hover:bg-coolGray-200 w-full bg-gray-100 p-4 shadow-md transition-all hover:shadow-lg">
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
    <div class="mt-4">
      {{ description + (description.length > 200 ? "..." : "") }}
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

const props = defineProps<{
  post: {
    id: number,
    title: string,
    content: string,
    createdDate: string,
    updatedDate: string
  }
}>()

const description = computed(() => {
  return truncateMarkdown(props.post.content, 200)
})

</script>
