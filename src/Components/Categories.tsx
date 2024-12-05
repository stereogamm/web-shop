import React from "react";
import { v4 as uuidv4 } from "uuid";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    const categoties = [
      "All",
      "Creamy Tonkotsu",
      "Veggie",
      "Seafood",
      "Miso Madness",
      "Ramen for the Brave",
    ];

    return (
      <nav className="categories">
        <ul>
          {categoties.map((categoryName, i) => (
            <li
              key={uuidv4()}
              onClick={() => onClickCategory(i)}
              className={value === i ? "active" : ""}
              tabIndex={0}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

export default Categories;
