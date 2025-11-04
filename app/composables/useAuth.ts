import { useCookie } from "#app";
import { useApi } from "#imports";

export const useAuth = () => {
  const token = useCookie("auth_token");

  const login = async (email: string, password: string) => {
    const api = useApi();
    try {
      const { data } = await api.post("/login", { email, password });
      token.value = data.token;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const api = useApi();
    try {
      await api.post("/logout");
    } catch (error) {
      console.warn("Logout failed (token mungkin sudah expired):", error);
    } finally {
      token.value = null; // pastikan cookie dihapus
    }
  };

  return { login, logout, token };
};
