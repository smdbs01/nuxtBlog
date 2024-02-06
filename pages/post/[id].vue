<template>
  <div class="relative flex min-h-full w-full flex-col items-center bg-gray-800 p-2">
    <ErrorComp
      v-if="error || status === 'error'"
      :message="error?.message || 'Something went wrong'"
      :status="error?.statusCode || 500"
    />
    <LoadingComp v-else-if="pending || status === 'pending'" />
    <div
      v-else
      class="size-full px-4 md:w-[758px]"
    >
      <ArticleComp
        :title="post?.title || ''"
        :content="parseMD2HTMLWithTOC(post?.content || '')"
      />
      <!-- Date -->
      <div class="mt-2 flex flex-col items-end text-gray-400">
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

<script setup lang="ts">
import { z } from "zod"

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdDate: z.string(),
  updatedDate: z.string(),
  published: z.number(),
})

definePageMeta({
  auth: false,
})

const route = useRoute()
const { data: post, pending, error, status } = await useFetch(`/api/posts/${route.params.id}`, {
  transform: (data) => postSchema.parse(data),
})

</script>
