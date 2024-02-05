<template>
  <div class="relative flex h-[calc(100vh-3.75rem)] w-full flex-col items-center">
    <ClientOnly>
      <LoadingComp
        v-if="pending"
        class="absolute"
      />
    </ClientOnly>
    <div class="w-[90%] px-2 lg:w-[60rem]">
      <div
        v-for="post in posts"
        :key="post.id"
      >
        <PostCardComp
          class="my-4"
          :post="post"
        />
      </div>
    </div>
    <PageButtonComp
      class="my-8"
      :total="total || 0"
      :current="currentPage"
      :size="10"
      @update-page="(i: number) => {
        currentPage = i
      }"
    />
    <div class="mt-10">
      123
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: false,
})

const { data: total, refresh: refreshTotal } = await useFetch("/api/posts/count")

const currentPage = ref(1)

const { data: posts, pending, error, refresh } = await useFetch("/api/posts", {
  query: {
    page: currentPage
  }
})

</script>
