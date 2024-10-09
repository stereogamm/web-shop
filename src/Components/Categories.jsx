import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Categories() {
  const categoties = [
    "All",
    "Creamy Tonkotsu",
    "Veggie",
    "Seafood",
    "Miso Madness",
    "Ramen for the Brave",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const changeState = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categoties.map((value, i) => (
          <li
            key={uuidv4()}
            onClick={() => changeState(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
