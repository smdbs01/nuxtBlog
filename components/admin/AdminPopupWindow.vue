<template>
  <div class="absolute left-0 top-0 flex size-full items-center justify-center">
    <div
      class="absolute left-0 top-0 flex size-full bg-gray-800 opacity-80"
      @click="$emit('cancel')"
    />
    <div class="relative z-10 flex flex-col rounded-md border border-gray-400 bg-gray-700 p-4">
      <slot name="content">
        Placeholder Content
      </slot>
      <div class="mt-4 flex justify-around">
        <button
          class="rounded-md border border-red-400 px-2 py-1 font-semibold transition-all hover:bg-red-400 hover:text-gray-700"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="rounded-md border border-green-400 px-2 py-1 font-semibold transition-all hover:bg-green-400 hover:text-gray-700"
          @click="$emit('submit')"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["submit", "cancel"])
</script>