<template>
  <article>
    <div v-if="content" v-html="contentHtml"></div>
  </article>
</template>
<script setup>

const props = defineProps({
  content: String
})

const contentHtml = ref("")
await parseMD2HTML(props.content).then((res) => {
  contentHtml.value = res
})


</script>