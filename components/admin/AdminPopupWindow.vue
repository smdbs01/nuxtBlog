<template>
  <div class="absolute left-0 top-0 size-full flex items-center justify-center">
    <div
      class="absolute left-0 top-0 size-full flex bg-gray-800 opacity-80"
      @click="$emit('cancel')"
    />
    <div class="relative z-10 max-w-[80%] flex flex-col border border-gray-400 rounded-md bg-gray-700 p-4 shadow-md">
      <slot>
        Placeholder Content
      </slot>
      <div class="mt-4 flex justify-around">
        <button
          class="border border-red-400 rounded-md px-2 py-1 font-semibold transition-all focus:bg-red-400 hover:bg-red-400 focus:text-gray-700 hover:text-gray-700"
          @click="$emit('cancel')"
        >
          {{ cancelText || "Cancel" }}
        </button>
        <button
          class="border border-green-400 rounded-md px-2 py-1 font-semibold transition-all focus:bg-red-400 hover:bg-green-400 focus:text-gray-700 hover:text-gray-700"
          @click="$emit('submit')"
        >
          {{ submitText || "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["submit", "cancel"])

defineProps<{
  cancelText?: string,
  submitText?: string
}>()
</script>