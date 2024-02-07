<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

useSeoMeta({
  title: "smdbs's Blog",
  ogTitle: "smdbs's Blog",
  twitterTitle: "smdbs's Blog",
  description: "smdbs's Blog",
  ogDescription: "smdbs's Blog",
  twitterDescription: "smdbs's Blog",
  ogImage: 'https://example.com/og-image.png',
  twitterImage: 'https://example.com/twitter-image.png',
  ogUrl: 'https://example.com',
  twitterCard: 'summary_large_image',
})

useHead({
  title: "smdbs's Blog",
  meta: [
    { name: 'description', content: "smdbs's Blog" },
    { name: 'theme-color', content: 'rgb(74, 222, 128)' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  }
})

</script>

<style>
html {
  @apply scroll-smooth;
}

body {
  @apply overflow-y-scroll bg-gray-800;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>