import axios from "axios";
import { useCookie } from "#app";

const api = axios.create({
  baseURL: import.meta.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
  withCredentials: true,
});

export const useApi = () => {
  const token = useCookie("auth_token");

  if (token.value) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }
  return api;
};
