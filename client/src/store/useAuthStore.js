import { create } from "zustand";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  email: "",
  password: "",
  loading: false,
  error: "",

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${url}/auth/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
        error: "",
      });

      console.log(res.data);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      set({ error: message });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
