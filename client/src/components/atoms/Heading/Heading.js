import React from "react";
import styles from "./Heading.module.scss";
import cx from "classnames";

const Heading = ({ children, custom }) => {
  const headingClass = cx(styles.heading, custom);
  return <h1 className={headingClass}>{children}</h1>;
};

export default Heading;
