<template>
  <div class="relative size-full flex flex-col items-center bg-gray-800 p-4 text-gray-100">
    <h1 class="mb-6 mt-2 text-3xl font-bold tracking-wider">
      Post Management
    </h1>
    <div>
      <!-- Sorting and creating -->
      <div class="flex gap-4">
        <button
          class="border-2 border-teal-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-teal-300 hover:bg-teal-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
          @click="newPost"
        >
          New Post
        </button>
      </div>
    </div>
    <AdminTable>
      <template #thead>
        <tr class="tracking-wider">
          <th class="w-[5%]">
            #
          </th>
          <th class="w-[30%]">
            Post Title
          </th>
          <th class="w-[10%]">
            Tags #
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
      </template>
      <template
        v-if="posts"
        #tbody
      >
        <tr v-if="posts.length === 0">
          <td colspan="6">
            No posts
          </td>
        </tr>
        <LoadingComp v-if="pending" />
        <tr
          v-for="post in posts"
          :key="post.id"
        >
          <td class="text-center">
            {{ post.id }}
          </td>
          <td class="font-semibold">
            <NuxtLink
              v-if="post.published === 1"
              :to="`/post/${post.id}`"
              class="border-b-(1 gray-400 dashed) tracking-wider transition-all hover:border-b-(gray-500 solid) hover:text-gray-400"
            >
              {{ post.title }}
            </NuxtLink>
            <span
              v-else
              class="text-gray-300 tracking-wider transition-all"
            >
              {{ post.title }}
            </span>
          </td>
          <td class="text-center">
            {{ post.postTags.length }}
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
                class="flex items-center gap-1 border-2 border-blue-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-blue-300 hover:bg-blue-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="editPost(post.id, post.title, post.content, post.published === 1, post.postTags.map(pt => pt.tag.id))"
              >
                <div class="i-ph:pencil" />
                <span class="font-semibold">Edit</span>
              </button>

              <button
                class="flex items-center gap-1 border-2 border-red-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-red-300 hover:bg-red-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="deletePost(post.id)"
              >
                <div class="i-ph:trash" />
                <span class="font-semibold">Delete</span>
              </button>

              <button
                class="flex items-center gap-1 border-2 border-green-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-green-300 hover:bg-green-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="viewPost"
              >
                <div class="i-ph:eye" />
                <span class="font-semibold">View</span>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </AdminTable>

    <PageButtonComp
      class="my-4"
      :total="total || 0"
      :current="currentPage"
      :size="pageSize"
      @update-page="(i) => {
        currentPage = i
      }"
    />

    <LazyAdminPopupWindow
      v-if="isEdit"
      @cancel="isEdit = false"
      @submit="updatePost"
    >
      <AdminPostEdit
        :content="editContent"
        :title="editTitle"
        :published="editPublished"
        :initial-tags="editTags"
        @update-content="(newContent: string) => { editContent = newContent }"
        @update-title="(newTitle: string) => { editTitle = newTitle }"
        @update-published="(newPublished: boolean) => { editPublished = newPublished }"
        @update-tags="(newTags: number[]) => { editTags = newTags }"
      />
    </LazyAdminPopupWindow>

    <LazyAdminPopupWindow
      v-if="isDelete"
      @cancel="isDelete = false"
      @submit="confirmDelete"
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
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: [
    "auth",
    "admin",
  ],
  layout: "admin"
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: total, refresh: refreshTotal } = await useFetch("/api/admin/posts/count", { headers })

const currentPage = ref(1)
const pageSize = ref(10)

const { data: posts, pending, refresh } = await useFetch("/api/admin/posts", {
  query: {
    page: currentPage,
    pageSize: pageSize
  },
  headers
})

const isEdit = ref(false)
const isDelete = ref(false)
const isView = ref(false)

const activePostID = ref(0)
const editTitle = ref("")
const editContent = ref("")
const editPublished = ref(false)
const editTags = ref<number[]>([])

const editPost = (id: number, title: string, content: string, published: boolean, tags: number[]) => {
  activePostID.value = id
  editTitle.value = title
  editContent.value = content
  editPublished.value = published
  editTags.value = tags

  isEdit.value = true
}

const newPost = () => {
  activePostID.value = 0
  editTitle.value = ""
  editContent.value = ""
  editPublished.value = false
  editTags.value = []

  isEdit.value = true
}

const updatePost = async () => {
  if (activePostID.value === 0) {
    // new post
    await $fetch("/api/admin/posts", {
      method: "POST",
      body: {
        title: editTitle.value,
        content: editContent.value,
        published: editPublished.value ? 1 : 0,
        tags: editTags.value
      }
    }).catch(() => {
      // do nothing
    }).then(() => {
      refreshTotal()
    })
  } else {
    await $fetch(`/api/admin/posts/${activePostID.value}`, {
      method: "PUT",
      body: {
        title: editTitle.value,
        content: editContent.value,
        published: editPublished.value ? 1 : 0,
        tags: editTags.value
      }
    }).catch(() => {
      // do nothing
    })
  }
  refresh()

  isEdit.value = false
}

const deletePost = (id: number) => {
  activePostID.value = id

  isDelete.value = true
}

const confirmDelete = async () => {
  await $fetch(`/api/admin/posts/${activePostID.value}`, {
    method: "DELETE"
  }).catch(() => {
    // do nothing
  }).then(() => {
    refresh()
    refreshTotal()
  })
  isDelete.value = false
}

const viewPost = () => {
  isView.value = true
}
</script>