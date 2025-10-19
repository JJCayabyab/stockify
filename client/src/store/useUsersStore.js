import { create } from "zustand";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useUsersStore = create((set) => ({
  usersLoading: false,
  error: "",
  userStats: {
    totalUsers: 0,
    totalAdmins: 0,
    totalStaff: 0,
  },

  setUsersLoading: (usersLoading) => set({ usersLoading }),
  setError: (error) => set({ error }),

  getUsersCount: async () => {
    set({ usersLoading: true, error: "" });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/users/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        userStats: {
          totalUsers: res.data.totalUsers,
          totalAdmins: res.data.totalAdmins,
          totalStaff: res.data.totalStaff,
        },
        usersLoading: false,
      });

      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed fetching user count.";
      set({ error: message, usersLoading: false });
      return false;
    }
  },
}));
