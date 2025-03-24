// src/stores/category.store.js
import { create } from "zustand";
import { data } from "../data/data";
import { emojiArrays } from "../data/emojiArray";

const useCategoryStore = create((set, get) => ({
  categories: data.category,
  emojiArrays: emojiArrays,
  currentCategory: null,

  selectCategory: (categoryValue) => set({ currentCategory: categoryValue }),

  getCategoryEmojis: () => {
    const { currentCategory, emojiArrays } = get();
    return currentCategory ? emojiArrays[currentCategory] : null;
  },
}));

export default useCategoryStore;
