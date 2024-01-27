<template>
  <div class="w-full min-h-screen pt-15 flex flex-col items-center">
    <form @submit.prevent class="w-200 flex flex-col gap-2">
      <input type="text" v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <div class="w-full flex items-center justify-around">
        <input type="checkbox" v-model="published" />
        <input type="number" v-model="id" />
      </div>
      <div class="w-full flex items-center justify-around">
        <button @click="upload">Submit</button>
        <button @click="update">Update</button>
        <button @click="deletePost">Delete</button>
      </div>
    </form>

    <div class="w-[90%] lg:w-[60rem] px-2">
      <div v-for="post in posts">
        <PostCard class="mt-4" :post="post" />
      </div>
    </div>

  </div>
</template>

<script setup>

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
