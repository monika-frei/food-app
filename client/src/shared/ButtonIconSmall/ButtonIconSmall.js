import React from "react";
import styles from "./ButtonIconSmall.module.scss";
import cx from "classnames";

const ButtonIconSmall = ({ bgImage, btnSize, custom, onClick }) => {
  const buttonClass = cx(styles.button, bgImage, btnSize, custom);
  return (
    <button type="button" className={buttonClass} onClick={onClick}></button>
  );
};

export default ButtonIconSmall;
