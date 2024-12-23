import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import image from "../../../public/assets/images/ramen.png";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/BasketSlice";
import { TbasketItem } from "../../redux/slices/BasketSlice";

//type for component props
type CardPropsType = {
  price: number;
  title: string;
  sizes: string[];
  types: number[];
  id: number;
};

//types for redux state
type BasketItem = CardPropsType & { count: number };
type RootState = {
  basketSlice: {
    items: BasketItem[];
  };
};

const Card: React.FC<CardPropsType> = ({ price, title, sizes, types, id }) => {
  const dispatch = useDispatch();

  const ramenCount = useSelector((state: RootState) => {
    const item = state.basketSlice.items.find((obj) => obj.id == id);
    return item || { count: 0 };
  });

  const addedCount = ramenCount ? ramenCount.count : 0;

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [count, setCount] = useState(0);

  const isSpicy = ["NO Spicy", "Spicy"];

  const addRamen = () => {
    setCount(count + 1);
  };

  const onClickAdd = () => {
    const item: TbasketItem = {
      id,
      price,
      type: isSpicy[activeType],
      size: sizes[activeSize],
      title,
      count: 0,
    };
    dispatch(addItem(item));
    addRamen();
  };

  return (
    <div className="ramen-block__wrapper">
      <div className="ramen-block">
        <img
          className="ramen-block__image"
          src={image}
          alt="Bowl of ramen and chopsticks with a soft-colored background and the text 'ramen'."
        />
        <h3 className="ramen-block__title">{title}</h3>
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
};

export default Card;
