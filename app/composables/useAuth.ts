export const useAuth = () => {
  const token = useCookie("auth_token");

  const login = async (email: string, password: string) => {
    const api = useApi();
    const { data } = await api.post("/login", { email, password });
    token.value = data.token;
    return data;
  };

  const logout = async () => {
    const api = useApi();
    await api.post("/logout");
    token.value = null;
  };

  return { login, logout, token };
};
