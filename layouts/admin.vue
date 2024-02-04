<template>
  <div
    style="scrollbar-gutter: stable;"
    class="h-screen"
  >
    <NavbarComp />
    <div class="flex h-[calc(100vh-3.75rem)] w-full items-start">
      <AdminSideNav class="h-full w-[88px] bg-gray-300 md:w-[256px]" />
      <div class="h-full w-[calc(100%-88px)] md:w-[calc(100%-256px)]">
        <slot />
      </div>
    </div>
  </div>
</template>