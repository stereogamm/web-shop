import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Importing lodash's debounce function to delay search input updates
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/FilterSlice";

import styles from "./search.module.scss";

const Search = () => {
  const dispatch = useDispatch();

  // Local state to manage the input's current value
  const [value, setValue] = useState("");

  // useRef for referencing the input element directly, enabling focus control
  const inputRef = useRef();

  // Handler to clear the input and focus the cursor back in the input field
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  // Memoized function to debounce the update of the search value in context
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 750), // Empty dependency array to ensure the function is only created once
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="search" className={styles.label}>
        <input
          ref={inputRef}
          id="search"
          className={styles.input}
          placeholder="Search..."
          type="text"
          pattern="[A-Za-z]*"
          inputMode="text"
          minLength="4"
          maxLength="20"
          aria-label="Search for your favorite ramen"
          role="searchbox"
          value={value}
          onChange={onChangeInput}
        />
        {value && (
          <svg
            className={styles.empty__icon}
            viewBox="0 0 600 600"
            onClick={() => onClickClear()}
          >
            <g id="Waste_management">
              <path d="M392,227.8a26.45,26.45,0,0,0-19.77-8.89H358.86c-7.69-11.32-29.49-19.49-55.21-19.49a105.22,105.22,0,0,0-32.38,4.81,27.21,27.21,0,0,1-17,0,105,105,0,0,0-32.36-4.81c-25.72,0-47.52,8.17-55.21,19.49H152.17a26.44,26.44,0,0,0-26.32,29l17.83,199.74a23.55,23.55,0,0,0,23.51,21.29H353.5A23.64,23.64,0,0,0,377,448.12l21.52-199.68A26.52,26.52,0,0,0,392,227.8ZM380.6,246.36,359.08,446a5.62,5.62,0,0,1-5.58,4.92H167.19a5.59,5.59,0,0,1-5.59-5L143.78,246.27v-.08a8.44,8.44,0,0,1,8.4-9.28H372.22a8.45,8.45,0,0,1,8.38,9.45Z" />
              <path d="M192.33,158.34a13.66,13.66,0,0,0,17.74-13V111.19h27.62v36.09h18V111.19h20.45v36.09h18V111.19h28.73V126.7a20.12,20.12,0,0,0,13.7,19.06L364.1,155a10.27,10.27,0,0,0,12.57-14.1l-16.15-34.37a10.26,10.26,0,0,1,0-8.73l16.15-34.38A10.27,10.27,0,0,0,364.1,49.36l-27.53,9.27a20.12,20.12,0,0,0-13.7,19.06v15.5H294.14V57.11h-18V93.19H255.69V57.11h-18V93.19H210.07V59.09a13.66,13.66,0,0,0-17.74-13c-16,5-40.63,17.36-64.39,47.73a13.68,13.68,0,0,0,0,16.83C151.7,141,176.32,153.32,192.33,158.34Zm-17.84-74a10.8,10.8,0,1,1-10.79,10.8A10.79,10.79,0,0,1,174.49,84.35Z" />
              <path d="M325,384.09l-7.87-5.41a64.23,64.23,0,0,0-54.33-98.55v16.71a47.53,47.53,0,0,1,40.55,72.36l-8-5.51a7.14,7.14,0,0,0-11.06,7.19l4.65,25a7.13,7.13,0,0,0,8.31,5.71l25-4.6A7.14,7.14,0,0,0,325,384.09Z" />
              <path d="M211.62,337.2a47.49,47.49,0,0,1,7-24.81l8,5.51a7.14,7.14,0,0,0,11.06-7.19l-4.65-25a7.14,7.14,0,0,0-8.31-5.71l-25,4.6A7.14,7.14,0,0,0,197,297.5l7.87,5.41a64.23,64.23,0,0,0,54.33,98.55V384.75A47.6,47.6,0,0,1,211.62,337.2Z" />
            </g>
          </svg>
        )}
      </label>
    </>
  );
};

export default Search;

Search.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};
