<template>
  <div class="flex min-h-screen w-full flex-col items-center p-2">
    <div v-if="error || status === 'error'">
      Clear error here
      <br>
      <button @click="navigateTo('/')">
        Back to home
      </button>
    </div>
    <LoadingComp
      v-else-if="pending || status === 'pending'"
      class="w-full"
    />
    <div
      v-else
      class="min-h-[100%] w-full px-4 md:w-[758px]"
    >
      <ArticleComp
        :id="post?.id || 0"
        :title="post?.title || ''"
        :content="post?.content || ''"
      />
    </div>
    <div>
      {{ $route.params.id }}
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { data: post, pending, error, status } = await useFetch(`/api/posts/${route.params.id}`)
</script>