<template>
  <div class="flex min-h-screen w-full flex-col items-center">
    <form
      class="w-200 flex flex-col gap-2"
      @submit.prevent
    >
      <input
        v-model="title"
        type="text"
        placeholder="Title"
      >
      <textarea
        v-model="content"
        placeholder="Content"
      />
      <div class="flex w-full items-center justify-around">
        <input
          v-model="published"
          type="checkbox"
        >
        <input
          v-model="id"
          type="number"
        >
      </div>
      <div class="flex w-full items-center justify-around">
        <button @click="upload">
          Submit
        </button>
        <button @click="update">
          Update
        </button>
        <button @click="deletePost">
          Delete
        </button>
      </div>
    </form>

    <div class="w-[90%] px-2 lg:w-[60rem]">
      <div
        v-for="post in posts"
        :key="post.id"
      >
        <PostCardComp
          class="mt-4"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const title = ref("")
const content = ref("")
const published = ref(false)
const id = ref(0)

const { data: posts, pending, error, refresh } = await useFetch("/api/posts")

const upload = async () => {
  await useFetch("/api/posts", {
    method: "POST",
    body: {
      title: title.value,
      content: content.value,
      published: published.value ? 1 : 0
    }
  }).then(() => {
    refresh()
  })
}

const update = async () => {
  if (id.value === 0) {
    return
  }
  await useFetch(`/api/posts/${id.value}`, {
    method: "PUT",
    body: {
      title: title.value,
      content: content.value,
      published: published.value ? 1 : 0
    }
  }).then((res) => {
    const error = res.error
    if (error) {
      console.log(error.value)
    }
    refresh()
    id.value = 0
    console.log(posts.value)
  })
}

const deletePost = async () => {
  if (id.value === 0) {
    return
  }
  await useFetch(`/api/posts/${id.value}`, {
    method: "DELETE",
  }).then((res) => {
    const error = res.error
    if (error) {
      console.log(error.value)
    }
    refresh()
    id.value = 0
  })
}

</script>
