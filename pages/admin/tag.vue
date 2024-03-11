<template>
  <div class="relative size-full flex flex-col items-center bg-gray-800 p-4 text-gray-100">
    <h1 class="mb-6 mt-2 text-3xl font-bold tracking-wider">
      Tag Management
    </h1>
    <div>
      <!-- Sorting and creating -->
      <div class="flex gap-4">
        <button
          class="border-2 border-teal-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-teal-300 hover:bg-teal-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
          @click="newTag"
        >
          New Tag
        </button>
      </div>
    </div>
    <AdminTable>
      <template #thead>
        <tr class="tracking-wider">
          <th class="w-[5%]">
            #
          </th>
          <th class="w-[10%]">
            Tag Name
          </th>
          <th class="w-[20%]">
            Preview
          </th>
          <th class="w-[5%]">
            Order
          </th>
          <th class="w-[5%]">
            Post Count
          </th>
          <th class="w-[15%]">
            Created Date
          </th>
          <th class="w-[15%]">
            Updated Date
          </th>
          <th class="w-[25%]">
            Actions
          </th>
        </tr>
      </template>

      <template
        v-if="tags"
        #tbody
      >
        <tr v-if="tags.length === 0">
          <td colspan="6">
            No tags
          </td>
        </tr>
        <LoadingComp v-if="pending" />

        <tr
          v-for="tag in tags"
          :key="tag.id"
        >
          <td class="text-center">
            {{ tag.id }}
          </td>
          <td class="text-center font-semibold">
            {{ tag.name }}
          </td>
          <td class="text-center">
            <TagComp
              :id="tag.id"
              :name="tag.name"
              :color="tag.color"
            />
          </td>
          <td class="text-center">
            {{ tag.order }}
          </td>
          <td class="text-center">
            {{ tag.postTags.length }}
          </td>
          <td class="text-center">
            {{ parseDateTimeString(tag.createdDate) }}
          </td>
          <td class="text-center">
            {{ parseDateTimeString(tag.updatedDate) }}
          </td>
          <td class="text-center">
            <div class="flex justify-center gap-4">
              <button
                class="flex items-center gap-1 border-2 border-blue-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-blue-300 hover:bg-blue-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="editTag(tag.id, tag.name, tag.order, tag.color)"
              >
                <div class="i-ph:pencil" />
                <span class="font-semibold">Edit</span>
              </button>

              <button
                class="flex items-center gap-1 border-2 border-red-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-red-300 hover:bg-red-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="deleteTag(tag.id)"
              >
                <div class="i-ph:trash" />
                <span class="font-semibold">Delete</span>
              </button>

              <button
                class="flex items-center gap-1 border-2 border-green-300 rounded-md px-2 py-1 transition-all duration-200 focus:bg-green-300 hover:bg-green-300 focus:text-gray-800 hover:text-gray-800 focus:outline-none"
                @click="viewTag"
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
      @submit="updateTag"
    >
      <AdminTagEdit
        :id="activeTagID"
        :name="editName"
        :order="editOrder"
        :color="editColor"
        @update-order="editOrder = $event"
        @update-name="editName = $event"
        @update-color="editColor = $event"
      />
    </LazyAdminPopupWindow>

    <LazyAdminPopupWindow
      v-if="isDelete"
      @cancel="isDelete = false"
      @submit="confirmDelete"
    >
      <div class="mb-2 flex flex-col items-center gap-1 text-gray-200">
        <span>
          Are you sure you want to delete this tag?
        </span>
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

<script
  setup
  lang="ts"
>
definePageMeta({
  middleware: [
    "auth",
    "admin",
  ],
  layout: "admin"
})

useHead({
  title: 'Tag Management | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Tag Management' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Tag Management | smdbs\'s Blog',
  twitterDescription: 'Tag Management | smdbs\'s Blog',
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: total, refresh: refreshTotal } = await useFetch("/api/admin/tags/count", { headers })

const currentPage = ref(1)
const pageSize = ref(10)

const { data: tags, pending, refresh } = await useFetch("/api/admin/tags", {
  query: {
    page: currentPage,
    pageSize: pageSize
  },
  headers
})

const isEdit = ref(false)
const isDelete = ref(false)
const isView = ref(false)

const activeTagID = ref(0)
const editName = ref("")
const editOrder = ref(0)
const editColor = ref("")

const editTag = (id: number, name: string, order: number, color: string) => {
  activeTagID.value = id
  editName.value = name
  editOrder.value = order
  editColor.value = color

  isEdit.value = true
}

const newTag = () => {
  activeTagID.value = 0
  editName.value = "Some Text"
  editOrder.value = 0
  editColor.value = "#000000"

  isEdit.value = true
}

const updateTag = async () => {
  if (activeTagID.value === 0) {
    // new post
    await $fetch("/api/admin/tags", {
      method: "POST",
      body: {
        name: editName.value,
        order: editOrder.value,
        color: editColor.value,
      }
    }).catch(() => {
      // do nothing
    }).then(() => {
      refreshTotal()
    })
  } else {
    await $fetch(`/api/admin/tags/${activeTagID.value}`, {
      method: "PUT",
      body: {
        name: editName.value,
        order: editOrder.value,
        color: editColor.value,
      }
    }).catch(() => {
      // do nothing
    })
  }
  refresh()

  isEdit.value = false
}

const deleteTag = (id: number) => {
  activeTagID.value = id

  isDelete.value = true
}

const confirmDelete = async () => {
  await $fetch(`/api/admin/tags/${activeTagID.value}`, {
    method: "DELETE"
  }).catch(() => {
    // do nothing
  }).then(() => {
    refresh()
    refreshTotal()
  })
  isDelete.value = false
}

const viewTag = () => {
  isView.value = true
}
</script>