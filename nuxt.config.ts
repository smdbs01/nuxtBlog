// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@sidebase/nuxt-auth"],
  auth: {
    provider: {
      type: "authjs",
    },
    baseURL: "http://localhost:3000",
  },
});
