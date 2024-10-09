import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import image from "../../../public/assets/images/ramen_4.png";

function Card({ price, title, sizes, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [count, setCount] = useState(0);

  const isSpicy = ["SPICY", "NO SPICY"];

  const addPizza = () => {
    setCount(count + 1);
  };

  return (
    <div className="ramen-block">
      <img className="ramen-block__image" src={image} alt="Pizza" />
      <h4 className="ramen-block__title">{title}</h4>
      <div className="ramen-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={uuidv4()}
              onClick={() => setActiveType(type)}
              className={activeType === type ? "active" : ""}
            >
              {type ? isSpicy[0] : isSpicy[1]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={uuidv4()}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="ramen-block__bottom">
        <div className="ramen-block__price">{price} btc</div>
        <button
          className="button button--outline button--add"
          onClick={addPizza}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path />
          </svg>
          <span>Add Yum </span>
          <i>{count}</i>
        </button>
      </div>
    </div>
  );
}

// Defined props types for component
Card.propTypes = {
  title: PropTypes.string.isRequired, // title should be string and required
  price: PropTypes.number.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Card;
