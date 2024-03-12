<template>
  <header class="sticky left-0 top-0 z-20 h-15 w-full flex items-center justify-center bg-gray-900">
    <nav class="w-full flex items-center justify-between px-2 sm:w-[60rem]">
      <div>
        <NuxtLink
          id="logo"
          to="/"
        >
          SMDBS <!-- Logo -->
        </NuxtLink>
      </div>
      <div class="flex items-center justify-around">
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/about">
          About
        </NuxtLink>

        <NuxtLink
          v-if="status !== 'authenticated'"
          :to="$route.path === '/' ? '/login' : '/login?redirect=' + $route.path"
        >
          Login
        </NuxtLink>
        <AvaterComp v-if="status === 'authenticated'" />
      </div>
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

#logo {
  @apply border-0 text-3xl text-gray-100 font-bold font-serif;
}
</style>