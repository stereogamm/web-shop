import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import image from "../../../public/assets/images/ramen_4.png";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/BasketSlice";

function Card({ price, title, sizes, types, id }) {
  const dispatch = useDispatch();
  const ramenCount = useSelector((state) => {
    const item = state.BasketSlice.items.find((obj) => obj.id == id);
    return item || {};
  });

  const addedCount = ramenCount ? ramenCount.count : 0;

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [count, setCount] = useState(0);

  const isSpicy = ["SPICY", "NO SPICY"];

  const addRamen = () => {
    setCount(count + 1);
  };

  const onClickAdd = () => {
    const item = {
      id,
      price,
      type: isSpicy[activeType],
      size: activeSize,
      title,
    };
    dispatch(addItem(item));
    addRamen();
  };

  return (
    <div className="ramen-block__wrapper">
      <div className="ramen-block">
        <img className="ramen-block__image" src={image} alt="Ramen" />
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
            onClick={onClickAdd}
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
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
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
  id: PropTypes.number.isRequired,
};

export default Card;
