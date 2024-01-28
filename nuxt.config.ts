export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxtjs/color-mode", "@nuxtjs/markdownit"],
  css: ["@unocss/reset/tailwind.css"],
  router: {
    options: {
      scrollBehaviorType: "auto",
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
