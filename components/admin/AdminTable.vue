<template>
  <table class="adminTable mt-4 w-[90%] border-separate border-spacing-none rounded-2">
    <thead>
      <slot name="thead" />
    </thead>
    <tbody class="relative">
      <slot name="tbody" />
    </tbody>
  </table>
</template>

<style>
.adminTable {
  th {
    @apply px-4 py-3 border-l border-t border-gray-600 bg-gray-700;
  }

  td {
    @apply px-4 py-2 border-l border-t border-gray-600 bg-gray-700;
  }

  tr:hover :is(th, td) {
    @apply bg-opacity-80 bg-gray-700;
  }

  th:last-of-type {
    @apply border-r;
  }

  tr:last-of-type td {
    @apply border-b;
  }

  tr td:last-of-type {
    @apply border-r;
  }

  th:first-of-type {
    border-top-left-radius: 8px;
  }

  th:last-of-type {
    border-top-right-radius: 8px;
  }

  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 8px;
  }

  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 8px;
  }
}
</style>