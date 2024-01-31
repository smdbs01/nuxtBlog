<template>
  <div style="scrollbar-gutter: stable;">
    <NavbarComp />
    <div class="flex min-h-screen w-full flex-col items-center">
      <div>Side nav</div>
      <slot />
    </div>
  </div>
</template>