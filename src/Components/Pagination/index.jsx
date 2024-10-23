import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import styles from "./pagination.module.scss";

const Pagination = ({ onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel="🔜"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={6}
    pageCount={3}
    previousLabel="🔙"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;

Pagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
};
