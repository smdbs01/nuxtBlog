<!-- eslint-disable vue/no-v-html -->
<template>
  <article>
    <div
      :class="{ 'opacity-0': isLoading }"
      class="mb-8 mt-12 flex justify-center text-5xl"
    >
      {{ title }}
    </div>
    <ClientOnly>
      <LoadingComp
        v-if="isLoading"
        class="fixed"
      />
    </ClientOnly>
    <div
      ref="contentEl"
      class="content relative w-full"
      :class="{ loaded: !isLoading, 'opacity-0': isLoading }"
      v-html="content"
    />
  </article>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: number,
  title: string,
  content: string
}>()

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.content }
  ]
})

const router = useRouter()
const contentEl: Ref<HTMLDivElement | null> = ref(null)
const isLoading = ref(true)

watch(() => contentEl.value, () => {
  if (contentEl.value) {
    isLoading.value = false

    contentEl.value.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.setAttribute('tabindex', '-1')
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = anchor.getAttribute('href') || ''
        router.replace({ hash: id })
        myScrollTo(document.querySelector(id), 80)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      })
    })

    contentEl.value.querySelectorAll('h1, h2, h3').forEach(heading => {
      heading.addEventListener('click', function (e) {
        e.preventDefault();
        router.replace({ hash: "#" + heading.id })
        myScrollTo(heading as HTMLElement, 80)
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
  contentEl.value?.querySelectorAll('h1, h2, h3').forEach(heading => {
    const anchor = contentEl.value?.querySelector('a[href="#' + heading.id + '"]')
    if (heading.getBoundingClientRect().top < window.screen.height && heading.getBoundingClientRect().bottom > 60) {
      anchor?.classList.add('active')
    } else {
      anchor?.classList.remove('active')
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
  @apply b-b-1 b-b-dashed b-b-gray-400;
  color: #35DD7C;
}

.content a:hover {
  @apply b-b-solid;
  color: #359323;
}

/* Headings */
.content h1 {
  @apply text-4xl my-12 relative cursor-pointer underline-offset-14;
}

.content h1:hover,
.content h2:hover,
.content h3:hover {
  @apply underline;
}

.content h2 {
  @apply text-3xl my-8 relative cursor-pointer underline-offset-10;
}

.content h3 {
  @apply text-2xl my-6 relative cursor-pointer underline-offset-8;
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
  @apply opacity-100 decoration-none;
}

.content .header-anchor {
  @apply w-8 absolute pos-left-[-2rem] opacity-0 b-b-0 text-teal-400 group-hover:opacity-100 transition-all;
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
  @apply text-gray-300;
}

.content ol li {
  @apply pl-2 my-4 list-outside list-decimal;
}

/* Blockquotes */
.content blockquote {
  @apply px-4 py-2 border-l-4 border-gray-500 text-gray-300;
}

/* Code */
.content code {
  @apply px-2 py-1 rounded-md bg-dark-900 b border-gray-700 opacity-100;
}

.content pre {
  @apply px-4 py-2 rounded-md bg-dark-900 border border-gray-700 overflow-x-auto shadow-md;
}

.content pre code {
  @apply bg-transparent b-none p-0;
}

/* Tables */
.content table {
  @apply w-full my-4 rounded-2 shadow-md border-separate border-spacing-none;
}

.content table th {
  @apply px-4 py-3 border-l border-t border-gray-700 bg-dark-900 font-semibold transition-all;
}

.content table th:last-of-type {
  @apply border-r;
}

.content table td {
  @apply px-4 py-2 border-l border-t border-gray-700 bg-dark-500 transition-all;
}

.content table tr:last-of-type td {
  @apply border-b;
}

.content table tr td:last-of-type {
  @apply border-r;
}

.content table tr:hover th {
  @apply bg-dark-800;
}

.content table tr:hover td {
  @apply bg-opacity-80 bg-dark-300;
}

/* Table Rounded */
/* https://stackoverflow.com/a/47318412 */
.content table th:first-of-type {
  border-top-left-radius: 8px;
}

.content table th:last-of-type {
  border-top-right-radius: 8px;
}

.content table tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 8px;
}

.content table tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 8px;
}

/* Emojis */
.content .emoji {
  @apply inline-block size-[1.2em] mx-0 mt-[0.05em] mb-[0.1em] vertical-[-0.1em];
}

/* Footnotes */
.content .footnotes {
  @apply px-4 py-2 rounded-md flex text-sm;
}

.content .footnote-ref a {
  @apply b-b-0;
}

.content .footnotes .footnote-backref {
  @apply ;
}

.content .footnotes .footnote-backref:hover {
  @apply bg-teal-400 b-b-0;
}

/* TOC */
.content .table-of-contents {
  @apply h-2xl w-[20%] p-l-8 fixed hidden b-l-1 b-l-dashed b-l-gray-600 top-40 overflow-y-auto;
  left: calc(70% + 7em);
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