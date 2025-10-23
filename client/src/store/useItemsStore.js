import { create } from "zustand";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useItemStore = create((set) => ({
  itemsLoading: false,
  itemsError: "",
  items: [],
  itemsCount: {
    totalItems: 0,
    lowStockItems: 0,
    itemsCountByCategory: [],
  },

 
  getItems: async () => {
    set({ itemsLoading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.items);
      set({ items: res.data.items, itemsLoading: false, itemsError: "" });
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed fetching data.";

      set({ itemsError: message, itemsLoading: false });
      return false;
    }
  },

  getItemsCount: async () => {
    set({ itemsLoading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/items/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        itemsCount: {
          totalItems: res.data.totalCount,
          lowStockItems: res.data.lowStockItems,
          itemsCountByCategory: res.data.byCategory,
        },
        itemsLoading: false,
      });
      console.log(res.data.byCategory);
    } catch (error) {
      const message = error.response?.data?.message || "Failed items count";

      set({ itemsError: message, itemsLoading: false });
      return false;
    }
  },
}));
