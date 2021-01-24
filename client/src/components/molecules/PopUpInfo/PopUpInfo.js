import React, { useMemo } from "react";
import styles from "./PopUpInfo.module.scss";
import Button from "../../atoms/Button/Button";

const PopUpInfo = ({ text, onClick }) => {
  const optionsBtn = useMemo(
    () => ({
      bgColor: "bgSecondary",
      custom: styles.button,
      onClick,
    }),
    []
  ); //tutaj useMemo jest niepotrzebne, nic się tutaj nie przerenderuje i tak
  return (
    <div className={styles.container}>
      <h3>{text}</h3>
      <div className={styles.buttons}>
        <Button
          bgColor={optionsBtn.bgColor}
          custom={optionsBtn.custom}
          onClick={optionsBtn.onClick}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default PopUpInfo;
