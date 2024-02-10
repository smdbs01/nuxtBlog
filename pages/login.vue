<template>
  <div class="flex min-h-[calc(100vh-3.75rem)] w-full flex-col items-center justify-center text-gray-100">
    <form
      class="w-md flex flex-col gap-2 rounded-md bg-gray-700 p-4"
      @submit.prevent="login"
    >
      <h1 class="text-center text-2xl font-semibold">
        User system is not finished
      </h1>
      <h1 class="text-center text-2xl font-semibold">
        You should not try to log in
      </h1>
      <label
        for="username"
        class="mt-2 text-gray-200"
      >
        Username
      </label>
      <input
        id="username"
        v-model="username"
        type="text"
        placeholder="Username"
        class="text-dark-800 focus:outline-(offset-0 blue-400 4) w-full rounded border-0 bg-gray-300 px-2 py-1 shadow-none outline-none transition-all"
      >
      <label
        for="password"
        class="mt-2 text-gray-200"
      >
        Password
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
        class="text-dark-800 focus:outline-(offset-0 blue-400 4) w-full rounded border-0 bg-gray-300 px-2 py-1 shadow-none outline-none transition-all"
      >
      <button
        type="submit"
        class="text-dark-800 mt-4 w-full rounded-md bg-green-500 p-1 font-semibold transition-all hover:bg-green-600 focus:bg-green-600"
      >
        Log in
      </button>
    </form>
    <div
      class="w-sm duration-400 transition-ease-in-out absolute bottom-20 flex h-[5rem] items-center justify-center rounded-md bg-red-400 p-2 text-xl text-white opacity-0 transition-all"
      :class="{ 'opacity-100': hasErr }"
      @click="hasErr = false"
    >
      <div class="i-ph:warning w-1.5em h-1.5em" />
      <span class="ml-2">Invalid credentials</span>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest-only",
  auth: {
    authneticatedRedirectTo: "/",
  }
})

const username = ref("user")
const password = ref("123456")

const { signIn } = useAuth()
const route = useRoute()
const hasErr = ref(false)
const timerID = ref()

const login = async () => {
  await signIn("credentials", {
    callbackUrl: route.query.callbackUrl?.toString() || "/",
    redirect: false,
    username: username.value,
    password: password.value,
  }).catch(() => {
    // Reset timer of the error popup
    clearTimer()
    hasErr.value = true
    setTimer()
  })
}

const setTimer = () => {
  timerID.value = setTimeout(() => {
    hasErr.value = false
  }, 3000)
}

const clearTimer = () => {
  clearTimeout(timerID.value)
}
</script>