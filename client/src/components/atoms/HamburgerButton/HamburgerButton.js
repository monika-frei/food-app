import React from "react";
import styles from "./HamburgerButton.module.scss";
import cx from "classnames";

const HamburgerButton = ({ open, handleClick }) => {
  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <div
        className={cx(styles.line, styles.lineTop, {
          [`lineTopOpen`]: open,
        })}
      />
      <div
        className={cx(styles.line, styles.lineMiddle, {
          [`lineMiddleOpen`]: open,
        })}
      />
      <div
        className={cx(styles.line, styles.lineBottom, {
          [`lineBottomOpen`]: open,
        })}
      />
    </div>
  );
};

export default HamburgerButton;
