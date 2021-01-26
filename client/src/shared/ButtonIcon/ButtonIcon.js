import React from "react";
import styles from "./ButtonIcon.module.scss";
import cx from "classnames";

const ButtonIcon = ({
  bgColor = "bgWhite",
  custom,
  lineColor = "borderWhite",
  onClick,
}) => {
  const iconClass = cx(styles.icon);
  const lineClass = cx(styles.line, lineColor);
  const buttonClass = cx(styles.button, bgColor, custom);
  return (
    <button className={buttonClass} onClick={onClick}>
      <div className={iconClass}>
        <div className={lineClass}></div>
        <div className={lineClass}></div>
      </div>
    </button>
  );
};

export default ButtonIcon;
