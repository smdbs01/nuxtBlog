<template>
  <div class="relative min-h-full w-full flex flex-col items-center bg-gray-800 p-2">
    <ErrorComp
      v-if="error || status === 'error'"
      :message="error?.message || 'Something went wrong'"
      :status="error?.statusCode || 500"
    />
    <LoadingComp v-else-if="pending || status === 'pending'" />
    <div
      v-else
      class="size-full px-4 md:w-[768px]"
    >
      <ArticleComp
        :title="post?.title || ''"
        :content="parseMD2HTMLWithTOC(post?.content || '')"
      />
      <!-- Tags -->
      <div
        v-if="post?.postTags"
        class="mt-4 flex flex-wrap gap-2 px-4 text-sm text-gray-300 font-semibold"
      >
        <span class="">Tags: </span>
        <div
          v-for="tag in sortedTags"
          :key="tag.id"
          class="group relative cursor-pointer border-l-2 border-l-green-700 px-2"
        >
          <span class="relative z-10 transition-all duration-300 group-hover:text-gray-100">
            {{ tag.name }}
          </span>
          <div
            class="absolute left-0 top-0 h-full w-0 bg-gradient-from-green-700 bg-gradient-to-teal-800 bg-gradient-to-r transition-all duration-300 group-hover:w-full"
          />
        </div>
      </div>

      <!-- Date -->
      <div class="mt-4 flex flex-col items-end text-gray-400">
        <span>
          Created at: {{ parseDateTimeString(post?.createdDate || "") }}
        </span>
        <span v-if="post?.updatedDate !== post?.createdDate">
          Updated at: {{ parseDateTimeString(post?.updatedDate || "") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
definePageMeta({
  auth: false,
})

const route = useRoute()
const { data: post, pending, error, status } = await useFetch(`/api/posts/${route.params.id}`)

const sortedTags = computed(() => {
  return (post.value?.postTags?.toSorted((a, b) => b.tag.order - a.tag.order))?.map((postTag) => postTag.tag)
})

</script>
