/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import styles from "./Warning.module.scss";
import Button from "../Button/Button";
import cx from "classnames";

const Warning = ({
  setWarningOpen,
  warningOpen,
  warningField,
  setWarningField,
  custom,
}) => {
  const containerClass = cx(styles.container, custom);

  const optionsBtn = useMemo(
    () => ({
      bgColor: "bgSecondary",
      custom: styles.button,
      onClick: () => {
        setWarningOpen(!warningOpen);
        setWarningField("");
      },
    }),
    [setWarningOpen]
  );
  return (
    <div className={containerClass}>
      {warningField !== "file" && (
        <h3>
          Please fill the <em>{warningField}</em> field
        </h3>
      )}
      {warningField === "file" && <h3>Please add a photo!</h3>}
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

export default Warning;
