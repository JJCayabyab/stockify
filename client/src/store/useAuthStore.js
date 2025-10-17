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
  setError: (error) => set({ error }), // ← Add this

  login: async (email, password) => {
    set({ loading: true, error: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
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

      set({ error: message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
