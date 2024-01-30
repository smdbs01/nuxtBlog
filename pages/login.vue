<template>
  <div class="flex min-h-screen w-full flex-col items-center bg-gray-100">
    <form @submit.prevent="login">
      <input
        v-model="username"
        type="text"
      >
      <input
        v-model="password"
        type="password"
      >
      <button type="submit">
        Login
      </button>
    </form>
    <button @click="() => signOut()">
      Sign Out
    </button>
    <pre>{{ status }}</pre>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const username = ref("admin")
const password = ref("root")

const { signIn, signOut, status, data } = useAuth()

const login = async () => {
  // @ts-ignore
  const { error } = await signIn("credentials", {
    username: username.value,
    password: password.value,
    redirect: false
  })

  if (error) {
    console.log(error)
    return
  } else {
    await navigateTo("/admin")
  }
}

</script>