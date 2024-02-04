<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-7xl h-3xl flex flex-col space-y-4 text-gray-100">
    <!-- Title Input -->
    <label
      for="title"
      class="text-lg font-bold"
    >Title:</label>
    <input
      id="title"
      v-model="titleRef"
      type="text"
      class="w-full rounded border p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
      @input="$emit('update-title', titleRef)"
    >

    <!-- Content Input -->
    <div class="flex h-[70%] w-full gap-4">
      <!-- Markdown Input -->
      <div class="flex w-1/2 flex-col">
        <div class="text-lg font-bold">
          Content:
        </div>
        <textarea
          v-model="contentRef"
          class="mr-2 h-full overflow-y-scroll rounded border p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-content', contentRef)"
        />
      </div>

      <div class="flex w-1/2 flex-col">
        <!-- Preview Area -->
        <div class="text-lg font-bold">
          Preview:
        </div>
        <div class="h-full overflow-y-scroll rounded border pl-8 pr-4">
          <div
            class="content"
            v-html="$parseMD2HTML(contentRef)"
          />
        </div>
      </div>
    </div>

    <!-- Publish Checkbox -->
    <div class="flex items-center space-x-2">
      <label
        for="published"
        class="text-lg font-bold"
      >Publish</label>
      <input
        id="published"
        v-model="publishedRef"
        type="checkbox"
        class="size-5 text-blue-500 focus:border-blue-300 focus:ring"
        @input="$emit('update-published', publishedRef)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  content: string,
  published: boolean
}>()

defineEmits(['update-title', 'update-content', 'update-published'])

const titleRef = ref('')
const contentRef = ref('')
const publishedRef = ref(false)

onMounted(() => {
  titleRef.value = props.title
  contentRef.value = props.content
  publishedRef.value = props.published
})

</script>

<style></style>