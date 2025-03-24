import { create } from "zustand";
import { data } from "../data/data";
import { emojiArrays } from "../data/emojiArray";

const useCategoryStore = create((set, get) => ({
  categories: data.category,
  emojiArrays: emojiArrays,
  currentCategory: null,

  selectCategory: (categoryValue) => {
    console.log("Attempting to set category", categoryValue);
    set({ currentCategory: categoryValue });
    console.log("Current category after update:", get().currentCategory); // Log the selected category
  },

  getCategoryEmojis: () => {
    const { currentCategory, emojiArrays } = get();
    return currentCategory ? emojiArrays[currentCategory] : null;
  },
}));

export default useCategoryStore;
