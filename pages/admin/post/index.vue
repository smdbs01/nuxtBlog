<template>
  <div class="bg-coolgray-200 relative flex size-full flex-col items-center p-4 text-gray-800">
    <h1 class="mb-6 mt-2 text-3xl font-bold">
      Post Management
    </h1>
    <table class="rounded-2 border-spacing-none w-[90%] border-separate">
      <thead>
        <tr class="">
          <th class="w-[5%]">
            #
          </th>
          <th class="w-[40%]">
            Post Title
          </th>
          <th class="w-[15%]">
            Created Date
          </th>
          <th class="w-[15%]">
            Updated Date
          </th>
          <th class="w-[5%]">
            Published
          </th>
          <th class="w-[20%]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody
        v-if="posts"
        class="relative"
      >
        <tr v-if="posts.length === 0">
          <td colspan="6">
            No posts
          </td>
        </tr>
        <LoadingComp
          v-show="pending"
          class="absolute"
        />
        <tr
          v-for="post in posts"
          :key="post.id"
        >
          <td class="text-center">
            {{ post.id }}
          </td>
          <td class="">
            <NuxtLink
              :to="`/post/${post.id}`"
              class="border-b-(1 gray-400 dashed) hover:border-b-(gray-500 solid) transition-all hover:text-gray-400 "
            >
              {{ post.title }}
            </NuxtLink>
          </td>
          <td class="text-center">
            {{ parseDateTimeString(post.createdDate) }}
          </td>
          <td class="text-center">
            {{ parseDateTimeString(post.updatedDate) }}
          </td>
          <td class="text-center">
            <div class="flex justify-center">
              <div
                v-if="post.published"
                class="i-ph:check size-6"
              />
              <div
                v-else
                class="i-ph:x size-6"
              />
            </div>
          </td>
          <td class="text-center">
            <div class="flex justify-center gap-4">
              <button
                class="hover:text-coolGray-100 flex items-center gap-1 rounded-md border-2 px-2 py-1 text-gray-800 transition-all hover:bg-blue-700"
              >
                <div class="i-ph:pencil" />
                <span class="font-semibold ">Edit</span>
              </button>

              <button
                class="hover:text-coolGray-100 flex items-center gap-1 rounded-md border-2 px-2 py-1 text-gray-800 transition-all hover:bg-red-700"
              >
                <div class="i-ph:trash" />
                <span class="font-semibold ">Delete</span>
              </button>

              <button
                class="hover:text-coolGray-100 flex items-center gap-1 rounded-md border-2 px-2 py-1 text-gray-800 transition-all hover:bg-green-700"
              >
                <div class="i-ph:eye" />
                <span class="font-semibold ">View</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <AdminPageButton
      class="my-4"
      :total="total"
      :current="currentPage"
      :size="pageSize"
      @update-page="(i) => {
        currentPage = i
      }"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    "admin",
  ],
  layout: "admin"
})

const { data: total, refresh: refreshTotal } = await useFetch("/api/posts/count")
const currentPage = ref(1)
const pageSize = ref(10)

const { data: posts, pending, error, refresh } = await useFetch("/api/posts/admin", {
  query: {
    page: currentPage,
    pageSize: pageSize
  },
})
</script>

<style scoped>
table th {
  @apply px-4 py-3 border-l border-t border-gray-300 bg-gray-200;
}

table th:last-of-type {
  @apply border-r;
}

table td {
  @apply px-4 py-2 border-l border-t border-gray-300 bg-gray-100;
}

table tr:last-of-type td {
  @apply border-b;
}

table tr td:last-of-type {
  @apply border-r;
}

table th:first-of-type {
  border-top-left-radius: 8px;
}

table th:last-of-type {
  border-top-right-radius: 8px;
}

table tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 8px;
}

table tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 8px;
}
</style>