<template>
  <div class="min-h-[calc(100vh-3.75rem)] w-full flex flex-col items-center justify-center text-gray-100">
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
        class="w-full border-0 rounded bg-gray-300 px-2 py-1 text-dark-800 shadow-none outline-none transition-all focus:outline-(4 blue-400 offset-0)"
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
        class="w-full border-0 rounded bg-gray-300 px-2 py-1 text-dark-800 shadow-none outline-none transition-all focus:outline-(4 blue-400 offset-0)"
      >
      <button
        type="submit"
        class="mt-4 w-full rounded-md bg-green-500 p-1 text-dark-800 font-semibold transition-all focus:bg-green-600 hover:bg-green-600"
      >
        Log in
      </button>
    </form>
    <div
      class="absolute bottom-20 h-[5rem] w-sm flex items-center justify-center rounded-md bg-red-400 p-2 text-xl text-white opacity-0 transition-all duration-400 transition-ease-in-out"
      :class="{ 'opacity-100': hasErr }"
      @click="hasErr = false"
    >
      <div class="i-ph:warning h-1.5em w-1.5em" />
      <span class="ml-2">Invalid credentials</span>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
definePageMeta({
  middleware: "guest-only",
  auth: {
    authneticatedRedirectTo: "/",
  }
})

useHead({
  title: 'Login | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Login | smdbs\'s Blog' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Login | smdbs\'s Blog',
  twitterDescription: 'Login | smdbs\'s Blog',
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