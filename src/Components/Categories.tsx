import React from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categoties = [
    "All",
    "Creamy Tonkotsu",
    "Veggie",
    "Seafood",
    "Miso Madness",
    "Ramen for the Brave",
  ];

  return (
    <div className="categories">
      <ul>
        {categoties.map((categoryName, i) => (
          <li
            key={uuidv4()}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
