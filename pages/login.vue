<template>
  <div class="flex min-h-screen w-full flex-col items-center">
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
    <pre>{{ status }}</pre>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">

const username = ref("jsmith")
const password = ref("123456")

const { signIn, signOut, status, data } = useAuth()

const login = () => {
  signIn("credentials", { username: username.value, password: password.value })
}

</script>