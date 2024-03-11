<template>
  <div>
    Account
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
  title: 'User Account Management | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'User Account Management' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'User Account Management | smdbs\'s Blog',
  twitterDescription: 'User Account Management | smdbs\'s Blog',
})

</script>