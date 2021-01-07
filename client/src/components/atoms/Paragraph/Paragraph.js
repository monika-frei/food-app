import React from "react";
import styles from "./Paragraph.module.scss";
import cx from "classnames";

const Paragraph = ({ children, custom }) => {
  const paragraphClass = cx(styles.paragraph, custom);
  return <p className={paragraphClass}>{children}</p>;
};

export default Paragraph;
