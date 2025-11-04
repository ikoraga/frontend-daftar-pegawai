import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useApi = () => {
  const token = useCookie("auth_token");

  if (token.value) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }
  return api;
};
