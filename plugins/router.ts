import { defineNuxtPlugin } from "#imports";

// https://github.com/nuxt/nuxt/discussions/16223#discussioncomment-3583082
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = async (to, from, savedPosition) => {
    let goTo;

    if (to.hash) {
      goTo = {
        el: to.hash,
        behavior: "smooth",
        top: 80,
      };
    } else if (savedPosition) {
      goTo = savedPosition;
    } else {
      goTo = { top: 0, behavior: "smooth" };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(goTo);
      }, 100);
    });
  };
});
