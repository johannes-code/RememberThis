// src/components/CategorySelector.jsx

import RegularButton from "./common/RegularButton";
import useCategoryStore from '../stores/category.store';

export function CategorySelector() {
  const { categories, currentCategory, selectCategory } = useCategoryStore();

  return (
    <div>
      {Object.keys(categories).map((category) => (
        <RegularButton
          key={category}
          onClick={() => selectCategory(category)}
          className={currentCategory === category ? "active" : ""}
        >
          {category}
        </RegularButton>
      ))}
      <RegularButton
        onClick={() => selectCategory(null)}
        className={currentCategory === null ? "active" : ""}
      >
        Random
      </RegularButton>
    </div>
  );
}
