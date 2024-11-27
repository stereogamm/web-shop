import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

/* eslint-disable @typescript-eslint/no-explicit-any */
type PaginationProps = {
  currentPage: number;
  changePage: any; //NEED to Fix any type
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, changePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel="🔜"
    onPageChange={(event) => changePage(event.selected + 1)}
    pageRangeDisplayed={6}
    pageCount={3}
    forcePage={currentPage - 1}
    previousLabel="🔙"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
