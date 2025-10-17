import { create } from "zustand";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const useItemStore = create((set) => ({
  loading: false,
  error: "",
  items: [],
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  getItems: async () => {
    set({ loading: true });
    try {
        const res = await axios.get(`${url}/items`)
        set({items:res.data})
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed fetching data.";

      set({ error: message, loading: false });
      return false;
    }
  },
}));
