import React from "react";
import styles from "./WelcomeTemplate.module.scss";
import Header from "../../shared/Header/Header";

const WelcomeTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export default WelcomeTemplate;
