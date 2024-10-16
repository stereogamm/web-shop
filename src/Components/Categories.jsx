// import React, { useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function Categories({ value, onClickCategory }) {
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
}

export default Categories;

Categories.propTypes = {
  value: PropTypes.number.isRequired, // should be num and required
  onClickCategory: PropTypes.func.isRequired,
};
