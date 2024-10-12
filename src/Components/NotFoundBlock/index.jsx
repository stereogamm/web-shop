import React from "react";
import { Link } from "react-router-dom";

import styles from "./notFoundBlock.module.scss";

const NotFoundBlock = () => (
  <div className={styles.root}>
    <h1>
      <span>🤫</span>
      <br />
      This is not the page you are looking for. Move along, move along!
    </h1>
    <p>
      *It seems this page has wandered off. While we track it down, you can head
      back to the homepage or pretend you never saw this.
    </p>
    <Link to="/" className={styles.btn__home} aria-label="return to main page">
      abort mission and return to base
    </Link>
  </div>
);

export default NotFoundBlock;
