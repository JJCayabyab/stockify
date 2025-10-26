import { create } from "zustand";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  email: "",
  password: "",
  authLoading: false,
  authError: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  addUser: async (userData) => {
    set({ authLoading: true, authError: "" });
    try {
      const res = await axios.post(`${url}/auth/register`, userData);
      set({ authLoading: false, authError: "" });
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Error adding user";
      console.log(error);
      set({ authError: message, authLoading: false });
      return false;
    }
  },
  login: async (email, password) => {
    set({ authLoading: true, authError: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await axios.post(`${url}/auth/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
        authLoading: false,
        authError: "",
      });

      console.log(res.data);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      set({ authError: message, authLoading: false });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
