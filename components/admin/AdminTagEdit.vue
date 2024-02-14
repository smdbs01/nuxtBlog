<template>
  <div class="mb-4 w-2xl flex flex-col text-gray-100 space-y-4">
    <!-- Name Input -->
    <div class="w-1/2 flex flex-col gap-2 pr-4">
      <label
        for="name"
        class="text-lg font-bold"
      >Name:</label>
      <div class="flex items-center gap-2">
        <input
          id="name"
          v-model="nameRef"
          type="text"
          class="w-full border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-name', nameRef)"
        >
      </div>
    </div>

    <div class="w-1/2 flex flex-col gap-2 pr-4">
      <label
        for="order"
        class="text-lg font-bold"
      >Order / Importance:</label>
      <div class="flex items-center gap-2">
        <input
          id="order"
          v-model="orderRef"
          type="number"
          class="w-full border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-order', orderRef)"
        >
      </div>
    </div>

    <!-- Color Input -->
    <div class="flex flex-col gap-2">
      <label
        for="color"
        class="text-lg font-bold"
      >Color:</label>
      <div class="flex items-center gap-2">
        <input
          id="color2"
          v-model="colorRef"
          type="text"
          class="w-64 border rounded p-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-color', colorRef)"
        >
        <input
          id="color"
          v-model="colorRef"
          type="color"
          class="h-10 w-10 border rounded p-1 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring"
          @input="$emit('update-color', colorRef)"
        >
        <span>{{ readability }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="text-lg font-bold">
        Preview:
      </div>
      <div class="h-12 w-64 flex items-center rounded-md bg-gray-100 p-2">
        <TagComp
          :id="id"
          :name="nameRef"
          :color="colorRef"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getReadability } from '~/utils/myColor'

const props = defineProps<{
  id: number,
  name: string,
  color: string,
  order: number,
}>()

defineEmits(['update-name', 'update-color', 'update-order'])

const nameRef = ref('')
const colorRef = ref('')
const orderRef = ref(0)

const readability = computed(() => {
  return getReadability(colorRef.value, "rgb(243, 244, 246)").toFixed(3)
})

onMounted(() => {
  nameRef.value = props.name
  colorRef.value = props.color
  orderRef.value = props.order
})

</script>

<style></style>