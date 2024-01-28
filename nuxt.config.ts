import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxtjs/color-mode", "@sidebase/nuxt-auth"],
  css: ["@unocss/reset/tailwind.css"],
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
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
