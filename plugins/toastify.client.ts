import { defineNuxtPlugin } from "nuxt/app";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const toastWrapper = {
    success: (msg: string, opts = {}) =>
      toast(msg, { type: "success", ...opts }),
    error: (msg: string, opts = {}) => toast(msg, { type: "error", ...opts }),
    warning: (msg: string, opts = {}) =>
      toast(msg, { type: "warning", ...opts }),
    info: (msg: string, opts = {}) => toast(msg, { type: "info", ...opts }),
  };

  nuxtApp.provide("toast", toastWrapper);
});
