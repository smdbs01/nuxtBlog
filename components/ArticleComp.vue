<!-- eslint-disable vue/no-v-html -->

<template>
  <article>
    <header class="mb-4 mt-8 flex justify-center text-balance text-5xl line-height-snug">
      {{ title }}
    </header>
    <div
      ref="contentEl"
      class="content relative w-full"
      v-html="content"
    />
  </article>
</template>

<script
  setup
  lang="ts"
>

const props = defineProps<{
  title: string,
  content: string,
}>()

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: truncateMarkdown(props.content, 100) }
  ]
})

const router = useRouter()
const contentEl: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  contentEl.value?.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

  contentEl.value?.querySelectorAll('h1, h2, h3').forEach(heading => {
    if (heading.querySelectorAll('a').length > 1) return

    const span = heading.querySelector('span.heading')
    if (!span) return
    span.addEventListener('click', function (e) {
      e.preventDefault();
      router.replace({ hash: "#" + heading.id })
      myScrollTo(heading as HTMLElement, 80)
    })
  })

  checkHeadingsInView()
  window.addEventListener('scroll', checkHeadingsInView)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkHeadingsInView)
})

const checkHeadingsInView = function () {
  let lastNonActive: Element | null = null
  contentEl.value?.querySelectorAll('h1, h2, h3').forEach(heading => {
    const anchor = contentEl.value?.querySelector('a[href="#' + heading.id + '"]')
    if (heading.getBoundingClientRect().top < window.innerHeight && heading.getBoundingClientRect().bottom > 80) {
      anchor?.classList.add('active')
    } else {
      anchor?.classList.remove('active')
      if (heading.getBoundingClientRect().top < 60) {
        lastNonActive = anchor ?? null
      }
    }
  })
  if (lastNonActive) {
    (lastNonActive as HTMLElement).classList.add('active')
  }
}
</script>

<style>
article {
  @apply flex flex-col justify-center items-center text-gray-100 opacity-95 relative;
}

.content {
  @apply px-2 b-t-2 b-t-dashed b-t-gray-600;

  /* Paragraph */
  p {
    @apply my-4;
    line-height: 1.8;
  }

  /* Links */
  a {
    @apply b-b-1 b-b-dashed b-b-gray-400;
    color: #35DD7C;
  }

  a:hover {
    @apply b-b-solid;
    color: #359323;
  }

  /* Headings */
  h1 {
    @apply text-4xl my-8 relative underline-offset-14;
  }

  h2 {
    @apply text-3xl my-6 relative underline-offset-10;
  }

  h3 {
    @apply text-2xl my-4 relative underline-offset-8;
  }

  h4 {
    @apply text-xl my-4 relative;
  }

  h5 {
    @apply text-lg my-4 relative;
  }

  h6 {
    @apply text-base my-4 relative;
  }

  h1,
  h2,
  h3 {
    span.heading:hover .header-anchor {
      @apply opacity-100;
    }

    /* Underline when there is no links inside the heading */
    span.heading:hover:not(:has(a:not(.header-anchor))) {
      @apply underline cursor-pointer;
    }

    .header-anchor {
      @apply w-8 absolute pos-left-[-2rem] opacity-0 b-b-0 text-teal-400 transition-all decoration-none;
    }

    .header-anchor:hover {
      @apply text-teal-500;
    }
  }

  /* Images */
  img {
    @apply mx-auto my-4 max-h-[80vw] sm:max-h-lg rounded-4;
  }

  /* Horizontal Rule */
  hr {
    @apply my-4 b-t-gray-300 opacity-20;
  }

  /* Lists */
  ul,
  ol {
    @apply pl-8 my-4;

    ::marker {
      @apply text-gray-300;
    }

    li {
      @apply my-2 list-outside;
    }
  }

  ul li {
    @apply pl-1 list-disc;
  }

  ol li {
    @apply pl-2 list-decimal;
  }

  /* Blockquotes */
  blockquote {
    @apply my-4 px-4 py-2 border-l-4 border-gray-500 text-gray-300;
  }

  /* Code */
  code:not(pre > code) {
    /* Inline code */
    @apply px-2 py-[0.15rem] rounded-md bg-dark-900 border border-gray-700 opacity-100 text-gray-300 mx-[0.1rem] whitespace-nowrap;
  }

  pre {
    /* Code block */
    @apply my-4 px-4 py-2 rounded-md max-h-[60vh] bg-dark-900 border border-gray-700 overflow-auto shadow-md;
    --scrollbar-color-thumb: rgb(55 65 81);
    --scrollbar-color-track: rgb(12 15 22);

    /* Legacy browsers */
    &::-webkit-scrollbar {
      @apply max-w-2 max-h-2 rounded-full;
    }

    &::-webkit-scrollbar-track {
      @apply rounded-full m-1;
      background-color: var(--scrollbar-color-track);
    }

    &::-webkit-scrollbar-thumb {
      @apply rounded-full;
      background-color: var(--scrollbar-color-thumb);
    }

    &::-webkit-scrollbar-corner {
      @apply opacity-0;
    }

    /* New browsers */
    @supports (scrollbar-width: auto) {
      & {
        scrollbar-color: var(--scrollbar-color-thumb) var(--scrollbar-color-track);
        scrollbar-width: thin;
      }
    }
  }

  /* Tables */
  /* Table Rounding: https://stackoverflow.com/a/47318412 */
  table {
    @apply w-full my-4 rounded-2 shadow-md border-separate border-spacing-none;

    tr {
      th {
        @apply px-4 py-3 border-l border-t border-gray-700 bg-dark-900 font-semibold transition-all;
      }

      th:last-of-type {
        @apply border-r;
      }

      td {
        @apply px-4 py-2 border-l border-t border-gray-700 bg-dark-500 transition-all;
      }

      td:last-of-type {
        @apply border-r;
      }
    }

    tr:first-of-type {

      /* Top row */
      th:first-of-type {
        border-top-left-radius: 8px;
      }

      th:last-of-type {
        border-top-right-radius: 8px;
      }
    }

    tr:last-of-type {

      /* Bottom row */
      td {
        @apply border-b;
      }

      td:first-of-type {
        border-bottom-left-radius: 8px;
      }

      td:last-of-type {
        border-bottom-right-radius: 8px;
      }
    }

    tr:hover {
      th {
        @apply bg-dark-800;
      }

      td {
        @apply bg-opacity-80 bg-dark-300;
      }
    }
  }

  /* Emojis */
  .emoji {
    @apply inline-block size-[1em] mx-0 mt-[0.05em] mb-[0.1em] vertical-[-0.1em];
  }

  /* Footnotes */
  .footnotes {
    @apply px-2 rounded-md text-sm;

    .footnote-backref {
      @apply transition-all bg-opacity-50;
    }

    .footnote-backref:hover {
      @apply bg-gray-400 b-b-0;
    }
  }


  /* TOC if has any headings */
  .table-of-contents:has(ol)::before {
    @apply text-gray-300 font-semibold opacity-90;
    content: "Table of Contents";
  }

  .table-of-contents:has(ol) {
    @apply h-2xl max-w-[21%] pl-8 pr-2 fixed hidden xl:block b-l-1 b-l-style-ridge b-l-gray-600 top-40 right-[calc(10%-8rem)] overflow-y-auto;

    --scrollbar-color-thumb: rgb(107 114 128);
    --scrollbar-color-track: rgb(55 65 81);

    ol {
      @apply list-none pl-0 my-0.5;
    }

    li {
      @apply list-none pl-4 my-0.5;

      a {
        @apply text-gray-400 b-b-0 transition-color underline-opacity-0;
      }

      a.active {
        @apply text-teal-400;
      }

      a:hover {
        @apply text-teal-300;
      }
    }

    /* Legacy browsers */
    &::-webkit-scrollbar {
      @apply max-w-2 max-h-2 rounded-full;
    }

    &::-webkit-scrollbar-track {
      @apply rounded-full m-1;
      background-color: var(--scrollbar-color-track);
    }

    &::-webkit-scrollbar-thumb {
      @apply rounded-full;
      background-color: var(--scrollbar-color-thumb);
    }

    /* New browsers */
    @supports (scrollbar-width: auto) {
      & {
        scrollbar-color: var(--scrollbar-color-thumb) var(--scrollbar-color-track);
        scrollbar-width: thin;
      }
    }
  }

  .table-of-contents>ol>li {
    @apply pl-0;
  }
}
</style>