import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Importing lodash's debounce function to delay search input updates
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/FilterSlice";

import styles from "./search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  // Local state to manage the input's current value
  const [value, setValue] = useState("");

  // useRef for referencing the input element directly, enabling focus control
  const inputRef = useRef<HTMLInputElement>(null);

  // Handler to clear the input and focus the cursor back in the input field
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
      // inputRef.current?.focus(); optional chaining - if inputRef contains current => call .focus()
    }
  };

  // Memoized function to debounce the update of the search value in context
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 750), // Empty dependency array to ensure the function is only created once
    [],
  );

  const onChangeInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.inputWrapper} role="search">
      <label
        htmlFor="search"
        className={`${styles.label} ${styles["visually-hidden"]}`}
      >
        Type ramen name to search
      </label>
      <input
        id="search"
        ref={inputRef}
        className={styles.input}
        name="search"
        type="text"
        pattern="[A-Za-z]*"
        inputMode="text"
        minLength={4}
        maxLength={20}
        role="searchbox"
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <svg
          className={styles.empty__icon}
          viewBox="0 0 40 40"
          onClick={() => onClickClear()}
        >
          <g id="grid_system" />
          <g id="_icons">
            <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
