import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-04",

  css: [
    fileURLToPath(new URL("./assets/css/tailwind.css", import.meta.url)),
    "vue3-toastify/dist/index.css",
  ],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },
});
