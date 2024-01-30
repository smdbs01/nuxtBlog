<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'My Blog',
  ogTitle: 'My Blog',
  twitterTitle: 'My Blog',
  description: 'My Blog',
  ogDescription: 'My Blog',
  twitterDescription: 'My Blog',
  ogImage: 'https://example.com/og-image.png',
  twitterImage: 'https://example.com/twitter-image.png',
})

useHead({
  title: 'My Blog',
  meta: [
    { name: 'description', content: 'My Blog' },
    { name: 'theme-color', content: 'rgb(74, 222, 128)' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})

</script>

<style>
html {
  @apply scroll-smooth;
}

body {
  @apply overflow-y-scroll bg-gray-800;
}
</style>