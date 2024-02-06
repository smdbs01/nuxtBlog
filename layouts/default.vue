<template>
  <div
    style="scrollbar-gutter: stable;"
    class="min-h-screen"
  >
    <NavbarComp />
    <div class="min-h-[calc(100vh-7.75rem)] w-full">
      <slot />
    </div>
    <FooterComp />
  </div>
</template>