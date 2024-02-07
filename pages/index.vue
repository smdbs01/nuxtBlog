<template>
  <div
    class="bg-gradient-from-gray-900 bg-gradient-to-gray-800 relative flex min-h-[calc(100vh-3.75rem)] w-full flex-col items-center bg-gradient-to-b pt-4"
  >
    <ClientOnly>
      <LoadingComp
        v-if="pending"
        class="absolute"
      />
    </ClientOnly>
    <div
      id="top"
      class="size-0 opacity-0"
    />
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
      @update-page="changePage"
    />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: false,
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: total } = await useFetch("/api/posts/count", { headers })

const currentPage = ref(1)

const { data: posts, pending } = await useFetch("/api/posts", {
  query: {
    page: currentPage
  },
  headers
})

const changePage = (i: number) => {
  setTimeout(() => {
    myScrollTo(document.getElementById('top'), 80)
  }, 150);

  currentPage.value = i
}


</script>
