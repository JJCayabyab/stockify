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
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.items);
      set({ items: res.data.items, loading: false, error: "" });
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed fetching data.";

      set({ error: message, loading: false });
      return false;
    }
  },
}));
