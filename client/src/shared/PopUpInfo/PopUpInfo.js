import React from "react";
import styles from "./PopUpInfo.module.scss";
import Button from "../Button/Button";

const PopUpInfo = ({ text, onClick }) => {
  return (
    <div className={styles.container}>
      <h3>{text}</h3>
      <div className={styles.buttons}>
        <Button bgColor="bgSecondary" custom={styles.button} onClick={onClick}>
          Ok
        </Button>
      </div>
    </div>
  );
};

export default PopUpInfo;
