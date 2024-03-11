<template>
  <ErrorComp
    :message="$route.path + ' not found'"
    :status="404"
  />
</template>

<script setup>
definePageMeta({
  auth: false
})

useHead({
  title: 'Page not found | smdbs\'s Blog',
  meta: [
    { name: 'description', content: 'Page not found | smdbs\'s Blog' },
  ]
})

useSeoMeta({
  ogTitle: 'smdbs\'s Blog',
  twitterTitle: 'smdbs\'s Blog',
  ogDescription: 'Page not found | smdbs\'s Blog',
  twitterDescription: 'Page not found | smdbs\'s Blog',
})
</script>