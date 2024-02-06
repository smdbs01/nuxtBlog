import { resolve } from "path";

export default defineNuxtConfig({
  vite: {
    build: {
      target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
    },
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  css: ["@unocss/reset/tailwind.css"],
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
    "nuxt-security",
    "@nuxt/devtools",
  ],
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_BASE_URL || "http://localhost:3000",
    provider: {
      type: "authjs",
    },
    globalAppMiddleware: true,
  },
  security: {
    headers: {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: "unsafe-none",
    },
    xssValidator: false,
  },
  nitro: {
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },
});
