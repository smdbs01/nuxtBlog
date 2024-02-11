<!-- eslint-disable vue/html-indent -->
<template>
  <div class="h-8 flex items-center justify-center gap-2 text-gray-100 font-semibold">
    <button
      title="Previous Page"
      class="size-6 transition-all disabled:cursor-not-allowed disabled:color-gray-300 hover:color-gray-400 disabled:opacity-50"
      :disabled="current === 1"
      @click="update(current - 1, 0)"
    >
      <div class="i-ph:caret-left m-auto h-1em w-1em" />
    </button>
    <button
      v-for="(i, idx) in pages"
      :key="i"
      class="size-8 text-center text-lg transition-all hover:color-teal-300"
      :title="i !== -1 ? `Page ${i}` : (idx < currentIndex ? `Page ${pages[idx + 1] - 1}` : `Page ${pages[idx - 1] + 1}`)"
      @click="update(i, idx)"
    >
      <span
        v-if="i !== -1"
        class="border-b-2 border-transparent"
        :class="{
          'color-teal-500': i === current,
          'border-b-teal-300': i === current
        }"
      >{{ i }}</span>
      <div
        v-else
        class="i-ph:dots-three-light m-auto h-1em w-1em"
      />
    </button>
    <button
      title="Next Page"
      :disabled="current === maxPage"
      class="size-8 transition-all disabled:cursor-not-allowed disabled:color-gray-300 hover:color-gray-400 disabled:opacity-50"
      @click="update(current + 1, 0)"
    >
      <div class="i-ph:caret-right m-auto h-1em w-1em" />
    </button>
    <div class="ml-2 h-8 flex items-center justify-center text-gray-300 font-normal">
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
  if (maxPage.value === 1) {
    return [1]
  }
  const arr = [1]
  if (maxPage.value === 1) {
    return arr
  }
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