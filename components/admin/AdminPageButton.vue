<!-- eslint-disable vue/html-indent -->
<template>
  <div class="flex h-8 items-center justify-center text-lg text-gray-100">
    <button
      title="Previous Page"
      class="disabled:color-gray-300 hover:color-gray-400 size-8 transition-all disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="current === 1"
      @click="update(current - 1, 0)"
    >
      <div class="i-ph:caret-left w-1em h-1em m-auto" />
    </button>
    <button
      v-for="(i, idx) in pages"
      :key="i"
      class="hover:color-teal-300 size-8 text-center transition-all"
      :class="{
        'color-teal-500': i === current,
        'underline': i === current
      }"
      :title="i !== -1 ? `Page ${i}` : (idx < currentIndex ? `Page ${pages[idx + 1] - 1}` : `Page ${pages[idx - 1] + 1}`)"
      @click="update(i, idx)"
    >
      <span v-if="i !== -1">{{ i }}</span>
      <div
        v-else
        class="i-ph:dots-three-light w-1em h-1em m-auto"
      />
    </button>
    <button
      title="Next Page"
      :disabled="current === maxPage"
      class="disabled:color-gray-300 hover:color-gray-400 size-8 transition-all disabled:cursor-not-allowed disabled:opacity-40"
      @click="update(current + 1, 0)"
    >
      <div class="i-ph:caret-right w-1em h-1em m-auto" />
    </button>
    <div class="ml-2 flex h-8 items-center justify-center text-base text-gray-300">
      {{ (current - 1) * size + 1 }} - {{ Math.min((current - 1) * size + size,
        total) }}
      of {{
        total
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number,
  current: number,
  size: number
}>()

const emit = defineEmits(["updatePage"])

const maxPage = computed(() => {
  return Math.ceil(props.total / props.size)
})

const pages = computed(() => {
  const arr = [1]
  for (let i = 2; i < maxPage.value; i++) {
    if (i >= props.current - 2 && i <= props.current + 2) {
      if (arr[arr.length - 1] !== i - 1) {
        arr.push(-1)
      }
      arr.push(i)
    }
  }
  if (arr[arr.length - 1] !== maxPage.value - 1) {
    arr.push(-1)
  }
  arr.push(maxPage.value)

  return arr
})

const currentIndex = computed(() => {
  return pages.value.indexOf(props.current)
})

const update = (target: number, idx: number) => {
  if (target !== -1) {
    emit("updatePage", target)
    return
  }
  if (idx < currentIndex.value) {
    emit("updatePage", pages.value[idx + 1] - 1)
  } else {
    emit("updatePage", pages.value[idx - 1] + 1)
  }
}
</script>