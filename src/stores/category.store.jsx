// src/stores/category.store.js
import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categories: {}, // This will be populated with your category data
  currentCategory: null,

  setCategories: (categories) => set({ categories }),
  selectCategory: (category) => set({ currentCategory: category }),
}));

export default useCategoryStore;
