import React from "react";
import styles from "./RecipesPageButtons.module.scss";
import cx from "classnames";
import Button from "../../../../shared/Button/Button";

const RecipesPageButtons = (props) => {
  const selectedMeal = props.options.selectedMeal;
  const classActiveBtn = props.options.classActiveBtn;
  const handleSelectOption = props.options.handleSelectOption;
  const meals = ["all", "breakfast", "lunch", "dinner", "snacks"];
  const buttonClass = cx(styles.button, {
    [`${styles.classActiveBtn}`]: classActiveBtn,
  });
  return (
    <div className={styles.buttons}>
      {meals.map((meal) => {
        return (
          <Button
            bgColor="bgPrimary"
            custom={selectedMeal === meal ? buttonClass : styles.button}
            onClick={() => handleSelectOption(meal)}
            key={meal}
          >
            {meal}
          </Button>
        );
      })}
    </div>
  );
};

export default RecipesPageButtons;
