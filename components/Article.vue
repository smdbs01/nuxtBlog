<template>
  <article>
    <div class="text-5xl flex justify-center my-4">
      {{ title }}
    </div>
    <div v-if="content" v-html="contentHtml" class="content"></div>
  </article>
</template>

<script setup>

const props = defineProps({
  title: String,
  content: String
})

const contentHtml = ref("")
await parseMD2HTML(props.content).then((res) => {
  contentHtml.value = res
})

</script>

<style>
article {
  @apply flex flex-col justify-center items-center text-gray-100 opacity-95;
}

.content p {
  @apply my-4;
}

.content a {
  @apply text-sky-400;
}

.content a:hover {
  @apply text-blue-500;
}

.content h1 {
  @apply text-4xl my-8;
}

.content h2 {
  @apply text-3xl my-6;
}

.content h3 {
  @apply text-2xl my-6;
}

.content h4 {
  @apply text-xl my-4;
}

.content h5 {
  @apply text-lg my-4;
}

.content h6 {
  @apply text-base my-4;
}

.content hr {
  @apply my-6 b-t-gray-300 opacity-20;
}

.content ul,
.content ol {
  @apply pl-8 my-4;
}

.content ul li {
  @apply pl-1 my-4 list-outside list-disc;
}

.content ul li::marker {
  @apply text-gray-400;
}

.content ol li {
  @apply pl-2 my-4 list-outside list-decimal;
}

.content blockquote {
  @apply px-4 py-2 border-l-4 border-gray-400;
}

.content code {
  @apply bg-gray-800 px-2 py-1 rounded-md opacity-100;
}

.content pre {
  @apply px-4 py-2 rounded-md bg-gray-800 overflow-x-auto shadow-md;
}

.content pre code {
  @apply bg-transparent p-0;
}

.content table {
  @apply w-full my-4 shadow-md;
}

.content table th {
  @apply px-4 py-2 b b-gray-400 b-t-0 bg-gray-800 font-semibold;
}

.content table td {
  @apply px-4 py-2 b b-gray-400 b-b-0 bg-gray-800;
}

.content table tr>td:first-of-type,
.content table tr>th:first-of-type {
  @apply b-l-none;
}

.content table tr>td:last-of-type,
.content table tr>th:last-of-type {
  @apply b-r-none;
}

/* https://stackoverflow.com/a/47318412 */
.content table th:first-of-type {
  border-top-left-radius: 1rem;
}

.content table th:last-of-type {
  border-top-right-radius: 1rem;
}

.content table tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 1rem;
}

.content table tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 1rem;
}



/* Syntax Highlight Start */
.content code .hljs-keyword {
  @apply text-yellow-400;
}

.content code .hljs-number {
  @apply text-teal-200;
}

.content code .hljs-string {
  @apply text-green-400;
}

.content code .hljs-title {
  @apply text-blue-400;
}

.content code .hljs-title.function_ {
  @apply text-teal-300;
}

.content code .hljs-built_in {
  @apply text-purple-400;
}

.content code .hljs-literal {
  @apply text-teal-200;
}

.content code .hljs-type {
  @apply text-purple-400;
}

.content code .hljs-operator {
  @apply text-pink-400;
}

.content code .hljs-params {
  @apply text-blue-400;
}

.content code .hljs-variable {
  @apply text-pink-400;
}

.content code .hljs-variable.language_ {
  @apply text-fuchsia-300;
}

.content code .hljs-comment {
  @apply text-gray-500;
}

.content code .hljs-doctag {
  @apply text-yellow-400;
}

/* Syntax Highlight End */
</style>