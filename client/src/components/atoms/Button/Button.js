import React from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

const Button = ({ children, bgColor, custom, onClick }) => {
  const buttonClass = cx(styles.button, bgColor, custom);
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
