<template>
  <div
    class="relative min-h-[calc(100vh-3.75rem)] w-full flex flex-col items-center bg-gradient-from-gray-900 bg-gradient-to-gray-800 bg-gradient-to-b pt-4"
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
          :id="post.id"
          class="my-4"
          :title="post.title"
          :content="post.content"
          :created-date="post.createdDate"
          :updated-date="post.updatedDate"
          :tags="post.postTags.map((postTag) => postTag.tag)"
        />
      </div>
    </div>
    <PageButtonComp
      class="my-8"
      :total="total || 0"
      :current="currentPage"
      :size="pageSize"
      @update-page="changePage"
    />
  </div>
</template>

<script setup lang="ts">

const { data: total } = await useFetch("/api/postcount")

const currentPage = ref(1)
const pageSize = 10

const { data: posts, pending } = await useFetch("/api/posts", {
  query: {
    page: currentPage,
    pageSize: pageSize,
  }
})

const changePage = (i: number) => {
  setTimeout(() => {
    myScrollTo(document.getElementById('top'), 80)
  }, 150);

  currentPage.value = i
}


</script>
