// src/components/CategorySelector.jsx

"use client"

import { useEffect } from 'react'
import RegularButton from "./common/RegularButton";
import { useCategoryStore } from "../stores/index.jsx";

export function CategorySelector() {
  const { categories, currentCategory, selectCategory } = useCategoryStore();


  useEffect(() => {
    console.log("CategorySelector re-rendered with category:", currentCategory);
  }, [currentCategory]);

  return (
    <div>
      {categories.map((category) => (
        <RegularButton
          key={category.value}
          onClick={() => selectCategory(category.value)}
          className={currentCategory === category.value ? "active" : ""}
        >
          {category.name}
        </RegularButton>
      ))}
      <RegularButton
        onClick={() => selectCategory(null)}
        className={currentCategory === null ? "active" : ""}
        aria-label="Select random category"
      >
        Random Category
      </RegularButton>
    </div>
  );
}
