import axios from "axios";
import { useCookie, navigateTo } from "#imports";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: import.meta.env.NUXT_PUBLIC_API_BASE,
    withCredentials: true,
  });

  // Tambah token otomatis
  api.interceptors.request.use((config) => {
    const token = useCookie("auth_token").value;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Global error handler
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        useCookie("auth_token").value = null;
        return navigateTo("/login");
      }
      return Promise.reject(err);
    }
  );

  // Inject ke Nuxt
  nuxtApp.provide("api", api);
});
