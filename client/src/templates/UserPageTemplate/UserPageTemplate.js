import React from "react";
import styles from "./UserPageTemplate.module.scss";
import Header from "../../components/organisms/Header/Header";
import PageType from "../../providers/PageType";

const UserPageTemplate = ({ children }) => {
  return (
    <PageType
      render={(type) => (
        <div className={styles.container}>
          <div className={styles.card}>
            <Header pageType={type} />
            {children}
          </div>
        </div>
      )}
    />
  );
};

export default UserPageTemplate;
