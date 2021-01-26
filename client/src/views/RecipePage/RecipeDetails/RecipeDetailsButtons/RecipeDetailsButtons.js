import React, { useContext } from "react";
import styles from "./RecipeDetailsButtons.module.scss";
import { GlobalContext } from "../../../../context/GlobalContext";
import cx from "classnames";
import Button from "../../../../shared/Button/Button";

const RecipeDetailsButtons = ({ options }) => {
  const { userId } = useContext(GlobalContext);
  const recipe = options.recipe;
  const toggle = options.toggle;

  return (
    <div className={styles.buttons}>
      {userId === recipe.userId && (
        <Button
          bgColor="bgSecondary"
          custom={cx(styles.btn, styles.btnSecondary)}
          onClick={toggle}
        >
          Edit
        </Button>
      )}

      <Button
        bgColor="bgPrimary"
        custom={cx(styles.btn, styles.btnPrimary)}
        onClick={options.handleOpenPopUpAddItem}
      >
        Add to plan
      </Button>
      {userId === recipe.userId && (
        <Button
          bgColor="bgGrey"
          custom={cx(styles.btn, styles.btnGrey)}
          onClick={options.handleOpenPopUpDeleteItem}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default RecipeDetailsButtons;
