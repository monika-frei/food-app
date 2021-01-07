import React, { useMemo } from "react";
import styles from "./PopUpDelete.module.scss";
import Button from "../../atoms/Button/Button";
import cx from "classnames";

const PopUpDelete = ({ setOpen, deleteItem, custom }) => {
  const buttonClass = cx(styles.container, custom);
  const optionsBtnYes = useMemo(
    () => ({
      bgColor: "bgGrey",
      custom: styles.button,
      onClick: deleteItem,
    }),
    [deleteItem]
  );
  const optionsBtnNo = useMemo(
    () => ({
      bgColor: "bgSecondary",
      custom: styles.button,
      onClick: setOpen,
    }),
    [setOpen]
  );
  return (
    <div className={buttonClass}>
      <h3>Do you really want to delete this item?</h3>
      <div className={styles.buttons}>
        <Button
          bgColor={optionsBtnYes.bgColor}
          custom={optionsBtnYes.custom}
          onClick={optionsBtnYes.onClick}
        >
          Yes
        </Button>
        <Button
          bgColor={optionsBtnNo.bgColor}
          custom={optionsBtnNo.custom}
          onClick={optionsBtnNo.onClick}
        >
          No!
        </Button>
      </div>
    </div>
  );
};

export default PopUpDelete;
