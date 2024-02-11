<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="h-3xl w-7xl flex flex-col text-gray-100 space-y-4">
    <!-- Title Input -->
    <label
      for="title"
      class="text-lg font-bold"
    >Title:</label>
    <input
      id="title"
      v-model="titleRef"
      type="text"
      class="w-full border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
      @input="$emit('update-title', titleRef)"
    >

    <!-- Content Input -->
    <div class="h-[70%] w-full flex gap-4">
      <!-- Markdown Input -->
      <div class="w-1/2 flex flex-col">
        <div class="text-lg font-bold">
          Content:
        </div>
        <textarea
          v-model="contentRef"
          class="mr-2 h-full overflow-y-scroll border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-content', contentRef)"
        />
      </div>

      <div class="w-1/2 flex flex-col">
        <!-- Preview Area -->
        <div class="text-lg font-bold">
          Preview:
        </div>
        <div class="h-full overflow-y-scroll border rounded pl-8 pr-4">
          <div
            class="content"
            v-html="parseMD2HTML(contentRef)"
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
        @input="$emit('update-published', !publishedRef)"
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