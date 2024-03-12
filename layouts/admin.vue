<template>
  <div
    style="scrollbar-gutter: stable;"
    class="h-screen"
  >
    <NavbarComp />
    <div class="h-[calc(100vh-3.75rem)] w-full flex items-start">
      <SideNavbar
        class="relative z-10 h-full w-[88px] bg-gray-300 md:w-[256px]"
        :tabs="[
          { tabName: 'Admin', url: '/admin', icon: 'i-ph:checks' },
          { tabName: 'Posts', url: '/admin/post', icon: 'i-ph:article' },
          { tabName: 'HTML Preview', url: '/admin/preview', icon: 'i-ph:brackets-angle' },
          { tabName: 'Images', url: '/admin/image', icon: 'i-ph:image' },
          { tabName: 'Tags', url: '/admin/tag', icon: 'i-ph:tag' },
          { tabName: 'Account', url: '/admin/account', icon: 'i-ph:user' },
        ]"
      />
      <div class="z-0 h-full w-[calc(100%-88px)] md:w-[calc(100%-256px)]">
        <slot />
      </div>
    </div>
  </div>
</template>