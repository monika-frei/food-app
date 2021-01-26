import React from "react";
import styles from "./SidebarButton.module.scss";
import cx from "classnames";

const SidebarButton = ({ children, bgColor, border, custom, onClick }) => {
  const buttonClass = cx(styles.button, bgColor, border, custom);
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default SidebarButton;
