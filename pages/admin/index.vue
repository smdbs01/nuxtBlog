<template>
  <div>
    DashBoard
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "admin",
    "auth"
  ],
  layout: "admin"
})

useHead({
  title: 'Admin Home Page | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Admin Dashboard' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Admin Home Page | smdbs\'s Blog',
  twitterDescription: 'Admin Home Page | smdbs\'s Blog',
})
</script>