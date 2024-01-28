<template>
  <article>
    <div class="text-5xl flex justify-center my-4">
      {{ title }}
    </div>
    <Loading v-if="isLoading" />
    <div v-html="$parseMD2HTML(content)" class="w-full content relative"
      :class="{ loaded: !isLoading, 'opacity-0': isLoading }" ref="contentEl"></div>
  </article>
</template>

<script setup>

const props = defineProps({
  id: Number,
  title: String,
  content: String
})

const router = useRouter()
const contentEl = ref(null)
const isLoading = ref(true)
const activeHeading = ref([])

watch(() => contentEl.value, () => {
  if (contentEl.value) {
    isLoading.value = false

    contentEl.value.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        router.replace({ hash: this.getAttribute('href') })
        scrollTo(document.querySelector(this.getAttribute('href')), 80)
        document.activeElement.blur();
      })
    })

    contentEl.value.querySelectorAll('h1, h2, h3').forEach(heading => {
      heading.addEventListener('click', function (e) {
        e.preventDefault();
        router.replace({ hash: "#" + this.id })
        scrollTo(this, 80)
      })
    })

    checkHeadingsInView()
    window.addEventListener('scroll', checkHeadingsInView)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkHeadingsInView)
})

const checkHeadingsInView = function () {
  const active = activeHeading.value
  contentEl.value.querySelectorAll('h1, h2, h3').forEach(heading => {
    if (heading.getBoundingClientRect().top < window.screen.height && heading.getBoundingClientRect().bottom > 60) {
      contentEl.value.querySelector('a[href="#' + heading.id + '"]').classList.add('active')
    } else {
      contentEl.value.querySelector('a[href="#' + heading.id + '"]').classList.remove('active')
    }
  })
}

</script>

<style>
article {
  @apply flex flex-col justify-center items-center text-gray-100 opacity-95 relative;
}

.content {
  @apply px-2;
}

/* Paragraph */
.content p {
  @apply my-4;
}

/* Links */
.content a {
  @apply text-sky-400;
}

.content a:hover {
  @apply text-blue-400 underline underline-blue-400;
}

/* Headings */
.content h1 {
  @apply text-4xl my-12 relative cursor-pointer;
}

.content h2 {
  @apply text-3xl my-8 relative cursor-pointer;
}

.content h3 {
  @apply text-2xl my-6 relative cursor-pointer;
}

.content h4 {
  @apply text-xl my-4 relative;
}

.content h5 {
  @apply text-lg my-4 relative;
}

.content h6 {
  @apply text-base my-4 relative;
}

.content h1:hover .header-anchor,
.content h2:hover .header-anchor,
.content h3:hover .header-anchor {
  @apply opacity-100;
}

.content .header-anchor {
  @apply w-8 absolute pos-left-[-2rem] opacity-0 text-blue-400 group-hover:opacity-100 transition-opacity;
}

.content .header-anchor:focus {
  @apply opacity-100 underline underline-blue-400 outline-none;
}

/* Images */
.content img {
  @apply mx-auto my-4 max-h-[80vw] sm:max-h-lg rounded-4;
}

/* Horizontal Rule */
.content hr {
  @apply my-6 b-t-gray-300 opacity-20;
}

/* Lists */
.content ul,
.content ol {
  @apply pl-8 my-4;
}

.content ul li {
  @apply pl-1 my-4 list-outside list-disc;
}

.content ul li::marker,
.content ol li::marker {
  @apply text-gray-400;
}

.content ol li {
  @apply pl-2 my-4 list-outside list-decimal;
}

/* Blockquotes */
.content blockquote {
  @apply px-4 py-2 border-l-4 border-gray-500;
}

/* Code */
.content code {
  @apply px-2 py-1 rounded-md bg-gray-800 b b-zinc-700 opacity-100;
}

.content pre {
  @apply px-4 py-2 rounded-md bg-gray-800 b b-zinc-700 overflow-x-auto shadow-md;
}

.content pre code {
  @apply bg-transparent b-none p-0;
}

/* Tables */
.content table {
  @apply w-full my-4 rounded-2 shadow-md border-separate border-spacing-none;
}

.content table th {
  @apply px-4 py-2 b b-l-0 b-gray-600 bg-gray-800 font-semibold;
}

.content table td {
  @apply px-4 py-2 b b-l-0 b-gray-600 b-t-none bg-gray-800;
}

.content table tr>td:first-of-type,
.content table tr>th:first-of-type {
  @apply b-l-1;
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

/* TOC */
.content .table-of-contents {
  @apply h-3xl w-[20%] fixed hidden top-40 overflow-y-auto;
  left: calc(70% + 7rem);
}

.content.loaded .table-of-contents {
  @apply xl:block;
}

.content .table-of-contents::before {
  @apply text-gray-100 font-semibold;
  content: "Table of Contents";
}

.content .table-of-contents ol {
  @apply list-none pl-0 my-1;
}

.content .table-of-contents>ol>li {
  @apply pl-1;
}

.content .table-of-contents li {
  @apply list-none pl-4 my-1;
}

.content .table-of-contents ol li a {
  @apply text-gray-400 b-b-0 transition-color underline-opacity-0;
}

.content .table-of-contents ol li a.active {
  @apply text-teal-400;
}

.content .table-of-contents ol li a:focus,
.content .table-of-contents ol li a:hover {
  @apply text-teal-300;
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