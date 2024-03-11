<template>
  <div>
    Image
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "auth",
    "admin",
  ],
  layout: "admin"
})

useHead({
  title: 'Image Management | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Image Management' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Image Management | smdbs\'s Blog',
  twitterDescription: 'Image Management | smdbs\'s Blog',
})

</script>