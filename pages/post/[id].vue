<template>
  <div class="w-full min-h-screen pt-15 flex flex-col items-center p-2">
    <div v-if="status === 'error'">
      Clear error here
      <br />
      <button @click="navigateTo('/')">Back to home</button>
    </div>
    <Loading v-else-if="status === 'pending'" class="w-full" />
    <div v-else class="w-full md:w-190 min-h-[100%] bg-gray-100 p-2">
      <Article :content="post.content" />
    </div>
    <div>
      {{ $route.params.id }}
    </div>
  </div>
</template>

<script setup>

const route = useRoute()
const { data: post, pending, refresh, error, status } = await useFetch(`/api/posts/${route.params.id}`)
</script>
