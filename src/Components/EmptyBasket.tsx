import React from "react";
import { Link } from "react-router-dom";

import styles from "../Components/NotFoundBlock/notFoundBlock.module.scss";

const EmptyBasket: React.FC = () => (
  <div className={styles.root}>
    <span>🫙</span>
    <h1>Empty cart === empty heart</h1>
    <p>*Don’t worry, a little shopping will fix that</p>
    <Link
      to="/"
      className={styles.btn__home}
      aria-label="return to the main page"
    >
      return to the main page
    </Link>
  </div>
);

export default EmptyBasket;
