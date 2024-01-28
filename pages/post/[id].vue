<template>
  <div class="w-full min-h-screen flex flex-col items-center p-2">
    <div v-if="status === 'error'">
      Clear error here
      <br />
      <button @click="navigateTo('/')">Back to home</button>
    </div>
    <Loading v-else-if="status === 'pending'" class="w-full" />
    <div v-else class="w-full md:w-[758px] min-h-[100%] px-4">
      <Article :id="post.id" :title="post.title" :content="post.content" />
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
