<template>
  <div>
    Markdown parsing preview
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
  title: 'Markdown Parsing Preview | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Markdown Parsing' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Markdown Parsing Preview | smdbs\'s Blog',
  twitterDescription: 'Markdown Parsing Preview | smdbs\'s Blog',
})
</script>