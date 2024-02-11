<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div class="flex items-center">
    <!-- For now, only display user name -->
    <span class="mx-4 border-gray-500 text-lg text-gray-200 font-semibold">{{ "Hello, " +
      session.user.name }}
    </span>
    <div class="relative flex">
      <button
        aria-label="Open user menu"
        class="z-10 block size-10 rounded-full bg-white focus:outline-blue-300"
        @click="isOpen = !isOpen"
      />
      <button
        v-if="isOpen"
        aria-label="Close Menu"
        class="fixed left-0 top-0 size-full cursor-default opacity-0"
        tabindex="-1"
        @click="isOpen = false"
      />
      <ul
        v-if="isOpen"
        class="absolute left-[-4rem] top-[calc(100%+0.5rem)] w-42 flex flex-col items-center b b-gray-600 rounded-2 bg-gray-800 py-2 text-lg text-gray-100 shadow-md"
      >
        <li>
          <NuxtLink
            to="/"
            @click="isOpen = false"
          >
            Profile
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/"
            @click="isOpen = false"
          >
            Settings
          </NuxtLink>
        </li>
        <li
          v-if="session.user.role === 'admin'"
          @click="isOpen = false"
        >
          <NuxtLink to="/admin">
            Admin
          </NuxtLink>
        </li>
        <li>
          <button
            class="w-full py-2 transition-all duration-100 hover:bg-gray-700 hover:color-green-400"
            @click="doSignOut"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { session, signOut } = useAuth();

const doSignOut = async () => {
  isOpen.value = false;
  await signOut();
}

const isOpen = ref(false);
</script>

<style scoped>
li {
  @apply block w-full;
}

li a {
  @apply hover:color-green-400 block w-full py-2 text-center hover:bg-gray-700 transition-all duration-100;
}
</style>