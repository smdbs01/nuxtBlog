<template>
  <div class="relative flex size-full flex-col items-center bg-gray-800 p-4 text-gray-200">
    <h1 class="mb-6 mt-2 text-3xl font-bold tracking-wider">
      Post Management
    </h1>
    <table class="rounded-2 border-spacing-none w-[90%] border-separate">
      <thead>
        <tr class="tracking-wider">
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
          v-if="pending"
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
              class="border-b-(1 gray-400 dashed) hover:border-b-(gray-500 solid) tracking-wider transition-all hover:text-gray-400 "
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
                class="flex items-center gap-1 rounded-md border-2 border-blue-300 px-2 py-1 transition-all duration-200 hover:bg-blue-300 hover:text-gray-800 focus:bg-blue-300 focus:text-gray-800 focus:outline-none"
                @click="editPost(post.id, post.title, post.content, post.published === 1)"
              >
                <div class="i-ph:pencil" />
                <span class="font-semibold ">Edit</span>
              </button>

              <button
                class="flex items-center gap-1 rounded-md border-2 border-red-300 px-2 py-1 transition-all duration-200 hover:bg-red-300 hover:text-gray-800 focus:bg-red-300 focus:text-gray-800 focus:outline-none"
                @click="deletePost"
              >
                <div class="i-ph:trash" />
                <span class="font-semibold ">Delete</span>
              </button>

              <button
                class="flex items-center gap-1 rounded-md border-2 border-green-300 px-2 py-1 transition-all duration-200 hover:bg-green-300 hover:text-gray-800 focus:bg-green-300 focus:text-gray-800 focus:outline-none"
                @click="viewPost"
              >
                <div class="i-ph:eye" />
                <span class="font-semibold ">View</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <LazyAdminPopupWindow
      v-if="isEdit"
      @cancel="isEdit = false"
      @submit="updatePost"
    >
      <AdminMarkdownEdit
        v-model:content="editContent"
        v-model:title="editTitle"
        v-model:published="editPublished"
        @update-content="(newContent: string) => { editContent = newContent }"
        @update-title="(newTitle: string) => { editTitle = newTitle }"
        @update-published="(newPublished: boolean) => { editPublished = !newPublished }"
      />
    </LazyAdminPopupWindow>

    <LazyAdminPopupWindow
      v-if="isDelete"
      @cancel="isDelete = false"
    >
      <div class="flex flex-col items-center gap-1 text-gray-200">
        <span>
          Are you sure you want to delete this post?
        </span>
        <span>Consider <b class="text-blue-300">unpublishing</b> it instead.</span>
      </div>
    </LazyAdminPopupWindow>

    <LazyAdminPopupWindow
      v-if="isView"
      @cancel="isView = false"
    >
      view
    </LazyAdminPopupWindow>

    <AdminPageButton
      class="my-4"
      :total="total || 0"
      :current="currentPage"
      :size="pageSize"
      @update-page="(i) => {
        currentPage = i
      }"
    />
  </div>
</template>

<script setup lang="ts">
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

const isEdit = ref(false)
const isDelete = ref(false)
const isView = ref(false)

const activePostID = ref(0)
const editTitle = ref("")
const editContent = ref("")
const editPublished = ref(false)
const editPost = (id: number, title: string, content: string, published: boolean) => {
  activePostID.value = id
  editTitle.value = title
  editContent.value = content
  editPublished.value = published

  isEdit.value = true
}

const updatePost = async () => {
  console.log(editTitle.value);
  console.log(editContent.value);
  console.log(editPublished.value);

  if (activePostID.value === 0) {
    // new post
    await useFetch("/api/posts/admin", {
      method: "POST",
      body: {
        title: editTitle.value,
        content: editContent.value,
        published: editPublished.value ? 1 : 0
      }
    })
    refreshTotal()
  } else {
    await useFetch(`/api/posts/admin/${activePostID.value}`, {
      method: "PUT",
      body: {
        title: editTitle.value,
        content: editContent.value,
        published: editPublished.value ? 1 : 0,
      }
    })
  }

  refresh()
  isEdit.value = false
}

const deletePost = () => {
  isDelete.value = true
}

const viewPost = () => {
  isView.value = true
}
</script>

<style scoped>
table th {
  @apply px-4 py-3 border-l border-t border-gray-600 bg-gray-700;
}

table th:last-of-type {
  @apply border-r;
}

table td {
  @apply px-4 py-2 border-l border-t border-gray-600 bg-gray-700;
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