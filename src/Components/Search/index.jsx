import React from "react";

import styles from "./search.module.scss";

const Search = () => (
  <>
    <label htmlFor="search">
      <input
        id="search"
        className={styles.input}
        placeholder="🔍 Find your match"
        type="text"
        pattern="[A-Za-z]*"
        inputMode="text"
        minLength="4"
        maxLength="30"
        aria-label="Search for your favorite ramen"
        role="searchbox"
      />
    </label>
  </>
);

export default Search;
