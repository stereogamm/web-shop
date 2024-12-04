import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/FilterSlice";
import { selectSort } from "../redux/slices/FilterSlice";

export type ListItem = {
  name: string;
  sortProperty: string;
};

export const list: ListItem[] = [
  { name: "rating 🔝", sortProperty: "rating" },
  { name: "price 🔻", sortProperty: "price" },
  { name: "price 🔺", sortProperty: "-price" },
  { name: "z - a", sortProperty: "title" },
  { name: "a - z", sortProperty: "-title" },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const changeSortList = () => {
    setVisible(!visible);
  };

  const changeOnClickItem = (obj: ListItem) => {
    dispatch(setSort(obj));
    setVisible(false);
  };

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleClickOutside = (event: MouseEvent) => {
      //NEED to Fix any type
      if (sortRef.current && !sortRef.current.contains(sortRef.current)) {
        setVisible(false);
      }
    };

    //add event listener
    document.body.addEventListener("click", handleClickOutside);

    //remove event listener - because this function will be called always to cleanup EventListener
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visible ? "rotate" : "rotate_out"}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by: </b>
        <span onClick={() => changeSortList()}>{sort.name}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                onClick={() => changeOnClickItem(obj)}
                key={uuidv4()}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
