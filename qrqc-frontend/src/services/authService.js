import api from "./api";

const authService = {
  login: async (username, password) => {
    const response = await api.post("/token/", {
      username,
      password,
    });

    // Sauvegarde des tokens
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },
};

export default authService;