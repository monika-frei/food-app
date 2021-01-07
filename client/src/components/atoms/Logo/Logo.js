import React from "react";
import styles from "./Logo.module.scss";
import cx from "classnames";

const Logo = ({ custom }) => {
  return <div className={cx(styles.logo, custom)}></div>;
};

export default Logo;
