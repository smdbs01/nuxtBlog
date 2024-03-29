import { resolve } from "node:path";

export default defineNuxtConfig({
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET || "Enter your secret here",
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL || "http://localhost:3000",
        verifyClientOnEveryRequest: true,
      },
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
      link: [
        {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css"}
      ]
    },
  },
  css: ["@unocss/reset/tailwind.css"],
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@hebilicious/authjs-nuxt",
    "nuxt-security",
    "@nuxt/devtools",
  ],
  security: {
    headers: {
      contentSecurityPolicy: false, // No user content
      permissionsPolicy: {
        camera: false,
        microphone: false,
        fullscreen: false,
        geolocation: false,
      },
      crossOriginEmbedderPolicy: "unsafe-none",
      crossOriginOpenerPolicy: "unsafe-none",
      crossOriginResourcePolicy: "same-origin",
      originAgentCluster: false,
      referrerPolicy: "same-origin",
      strictTransportSecurity: false, // TODO HTTPS
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 60000,
    },
    xssValidator: false, // No user content
    csrf: false,
    hidePoweredBy: false,
  },
  vite: {
    build: {
      target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },
});
