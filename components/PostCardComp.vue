<template>
  <div class="w-full rounded-2 bg-gray-100 p-4 shadow-md transition-all hover:bg-coolGray-200 hover:shadow-lg">
    <!-- Title -->
    <div>
      <NuxtLink
        :to="'/post/' + id"
        class="border-b-(2 gray-300) text-balance text-xl font-semibold transition-all hover:border-gray-500"
      >
        {{ title }}
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="mt-4">
      {{ description + (description.length > truncateLength ? "..." : "") }}
    </div>

    <div class="mt-2 flex items-end justify-between">
      <!-- Tags -->
      <div class="flex gap-2">
        <TagComp
          v-for="tag in sortedTags"
          :id="tag.id"
          :key="tag.id"
          :name="tag.name"
          :color="tag.color"
        />
      </div>

      <!-- Time -->
      <div class="mt-2 text-right text-sm">
        <div>
          Created at:
          <span class="font-mono">
            {{ parseDateTimeString(createdDate) }}
          </span>
        </div>
        <div v-if="updatedDate !== createdDate">
          Updated at:
          <span class="font-mono">
            {{ parseDateTimeString(updatedDate) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: number,
  title: string,
  content: string,
  createdDate: string,
  updatedDate: string,
  tags: {
    id: number,
    name: string,
    color: string,
    order: number
  }[],
}>()

const truncateLength = 150
const description = computed(() => {
  return truncateMarkdown(props.content, truncateLength)
})

const sortedTags = computed(() => {
  return props.tags.toSorted((a, b) => b.order - a.order).slice(0, 4) // Large to small
})

</script>
