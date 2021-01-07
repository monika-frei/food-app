import React from "react";
import styles from "./PageTemplate.module.scss";
import cx from "classnames";
import UserPageTemplate from "../UserPageTemplate/UserPageTemplate";

const PageTemplate = ({ children, border, bgColorLight }) => {
  const wrapperClass = cx(styles.wrapper, border, bgColorLight);
  return (
    <UserPageTemplate>
      <div className={wrapperClass}>
        <div className={styles.page}>{children}</div>
      </div>
    </UserPageTemplate>
  );
};

export default PageTemplate;
