import { create } from "zustand";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useLogsStore = create((set) => ({
  logsLoading: false,
  logsError: "",
  logs: [],
  logsCount: 0,
  getLogsCount: async () => {
    set({ logsLoading: true, logsError: "" });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/logs/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ logsCount: res.data.logsCount, logsLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || "Failed items count";

      set({ logsError: message, logsLoading: false });
      return false;
    }
  },
  getLogs: async () => {
    set({ logsLoading: true, logsError: "" });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ logs: res.data.logs, logsLoading: false });
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed fetching log";

      set({ logsError: message, logsLoading: false });
      return false;
    }
  },
}));
