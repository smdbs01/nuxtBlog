<template>
  <header class="h-15 sticky left-0 top-0 z-20 flex w-full items-center justify-center bg-gray-900">
    <nav class="flex w-full items-center justify-between px-2 sm:w-[60rem]">
      <div class="flex items-center justify-around">
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/about">
          About
        </NuxtLink>
      </div>
      <NuxtLink
        v-if="status !== 'authenticated'"
        :to="$route.path === '/' ? '/login' : '/login?redirect=' + $route.path"
      >
        Login
      </NuxtLink>
      <AvaterComp v-if="status === 'authenticated'" />
    </nav>
  </header>
</template>

<script setup>
const { status } = useAuth()

</script>

<style scoped>
nav a {
  @apply border-b-2 border-gray-500 text-gray-100 text-lg font-semibold uppercase tracking-wider mx-4 transition-colors;
}

nav a.router-link-active {
  @apply text-green-400 border-green-800;
}

nav a:hover {
  @apply text-green-400 border-green-500;
}
</style>