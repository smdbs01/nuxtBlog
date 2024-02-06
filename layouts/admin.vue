<template>
  <div
    style="scrollbar-gutter: stable;"
    class="h-screen"
  >
    <NavbarComp />
    <div class="flex h-[calc(100vh-3.75rem)] w-full items-start">
      <SideNavbar
        class="h-full w-[88px] bg-gray-300 md:w-[256px]"
        :tabs="[
          { tabName: 'Admin', url: '/admin', icon: 'i-ph:checks' },
          { tabName: 'Posts', url: '/admin/post', icon: 'i-ph:article' },
          { tabName: 'Images', url: '/admin/image', icon: 'i-ph:image' },
          { tabName: 'Account', url: '/admin/account', icon: 'i-ph:user' }
        ]"
      />
      <div class="h-full w-[calc(100%-88px)] md:w-[calc(100%-256px)]">
        <slot />
      </div>
    </div>
  </div>
</template>