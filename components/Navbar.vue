<template>
  <header class="w-full h-15 flex items-center justify-center bg-gray-900 sticky top-0 left-0 z-20">
    <nav class="w-full sm:w-[50rem] flex items-center justify-between px-2">
      <NuxtLink to="/">Home</NuxtLink>
      <div class="flex items-center justify-around">
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </nav>
  </header>
</template>

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