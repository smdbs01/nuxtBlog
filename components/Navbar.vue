<template>
  <header class="w-full h-15 flex items-center justify-center bg-gray-900 position-sticky">
    <nav class="w-full sm:w-[40rem] flex items-center justify-between">
      <NuxtLink to="/">Home</NuxtLink>
      <div class="w-[30%] flex items-center justify-around">
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style>
nav a {
  @apply border-b-2 border-gray-500 text-gray-100 text-lg font-semibold uppercase tracking-wider m-2 transition-colors;
}

nav a.router-link-active {
  @apply text-green-400 border-green-800;
}

nav a:hover {
  @apply text-green-400 border-green-500;
}
</style>