<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="h-3xl w-7xl flex flex-col text-gray-100 space-y-4">
    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <label
        for="title"
        class="text-lg font-bold"
      >Title:</label>
      <label
        for="published"
        class="text-lg font-bold"
      >Publish</label>
      <!-- Title Input -->
      <input
        id="title"
        v-model="titleRef"
        type="text"
        class="w-full border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
        @input="$emit('update-title', titleRef)"
      >
      <!-- Publish Checkbox -->
      <div class="flex items-center space-x-2">
        <input
          id="published"
          v-model="publishedRef"
          type="checkbox"
          class="size-5 text-blue-500 focus:border-blue-300 focus:ring"
          @input="$emit('update-published', !publishedRef)"
        >
      </div>
    </div>

    <div class="relative w-full flex flex-col gap-2">
      <label
        for="tags"
        class="text-lg font-bold"
      >
        Tags:
      </label>
      <div class="relative w-1/2">
        <button
          class="group relative w-full flex items-center justify-between gap-4 rounded bg-gray-100"
          @click="(event) => {
            if (event.target === event.currentTarget) {
              isTagOpen = !isTagOpen
            }
          }"
        >
          <div class="h-12 flex flex-wrap cursor-pointer items-center gap-2 overflow-y-auto p-2">
            <div
              v-if="activeTags?.length === 0"
              class="flex items-center text-gray-500"
            >
              No Tags
            </div>
            <TagComp
              v-for="tag in activeTags"
              :id="tag.id"
              :key="tag.id"
              :name="tag.name"
              :color="tag.color"
              @tag-click="selectTag"
            />
          </div>
          <div
            class="i-ph-caret-right mr-2 size-[1.5em] bg-gray-500 transition-all duration-200 group-focus:bg-gray-700 group-hover:bg-gray-700"
            :class="{ 'rotate-180': isTagOpen }"
            @click="isTagOpen = !isTagOpen"
          />
        </button>
        <!-- Tag Dropdown -->
        <div
          class="absolute bottom-0 left-100% max-h-24 min-h-12 w-full flex flex-wrap gap-2 overflow-y-auto rounded-md bg-gray-100 p-2 shadow-md transition-all duration-200"
          :class="{
            'translate-x-0': isTagOpen,
            'translate-x-[-30]': !isTagOpen,
            'opacity-0': !isTagOpen,
            'opacity-100': isTagOpen,
          }"
        >
          <div
            v-if="nonActiveTags?.length === 0"
            class="flex items-center text-gray-500"
          >
            No Tags
          </div>
          <TagComp
            v-for="tag in nonActiveTags"
            :id="tag.id"
            :key="tag.id"
            :name="tag.name"
            :color="tag.color"
            @tag-click="selectTag"
          />
        </div>
      </div>
    </div>


    <!-- Content Input -->
    <div class="grid grid-cols-2 max-h-[70%] w-full gap-x-4 gap-y-2 p-x-2">
      <div class="text-lg font-bold">
        Content:
      </div>
      <div class="text-lg font-bold">
        Preview:
      </div>
      <!-- Markdown Input -->
      <textarea
        v-model="contentRef"
        class="h-full overflow-y-scroll border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
        @input="$emit('update-content', contentRef)"
      />

      <!-- Preview Area -->
      <div class="h-full overflow-y-scroll border rounded pl-8 pr-4">
        <header class="mb-4 mt-8 flex justify-center text-balance text-5xl line-height-snug">
          {{ title }}
        </header>
        <div
          class="content"
          v-html="parseMD2HTML(contentRef)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  content: string,
  published: boolean,
  initialTags: number[],
}>()

const emits = defineEmits(['update-title', 'update-content', 'update-published', 'update-tags'])

const titleRef = ref('')
const contentRef = ref('')
const publishedRef = ref(false)
const activeTagsRef = ref<number[]>([])
const isTagOpen = ref(false)

onMounted(() => {
  titleRef.value = props.title
  contentRef.value = props.content
  publishedRef.value = props.published
  activeTagsRef.value = props.initialTags
})

const { data: allTags, } = await useFetch('/api/admin/tags')

const activeTags = computed(() => {
  return allTags.value?.filter((tag) => {
    return activeTagsRef.value.includes(tag.id)
  })
})

const nonActiveTags = computed(() => {
  return allTags.value?.filter((tag) => {
    return !activeTagsRef.value.includes(tag.id)
  })
})

const selectTag = (tagID: number) => {
  isTagOpen.value = true
  if (activeTagsRef.value.includes(tagID)) {
    activeTagsRef.value = activeTagsRef.value.filter((id) => {
      return id !== tagID
    })
  } else {
    activeTagsRef.value.push(tagID)
  }
  emits('update-tags', activeTagsRef.value)
}

</script>

<style></style>