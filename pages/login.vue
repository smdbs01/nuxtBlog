<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">

const username = ref("jsmith")
const password = ref("123456")

const { signIn, signOut, } = useAuth()

const login = () => {
  signIn("credentials", { username: username.value, password: password.value })
}

</script>