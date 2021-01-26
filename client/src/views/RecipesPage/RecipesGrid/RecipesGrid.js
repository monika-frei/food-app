import React, { useContext } from "react";
import styles from "./RecipesGrid.module.scss";
import cx from "classnames";
import LoadingSpinner from "../../../shared/LoadingSpinner/LoadingSpinner";
import { GlobalContext } from "../../../context/GlobalContext";
import SubLoad from "./Subload";

const RecipesGrid = ({ meal, inputContent, handleQuickAdd }) => {
  const { recipes, recipesLoading } = useContext(GlobalContext);
  const wrapperClass = cx("list", styles.wrapper);

  const recipesArray =
    meal === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.category.includes(meal));

  if (recipesLoading || !recipesArray) {
    return (
      <section className={cx(styles.wrapper, styles.wrapperSpinner)}>
        <LoadingSpinner />
      </section>
    );
  }
  return (
    <section className={wrapperClass}>
      {recipesArray &&
        recipesArray
          .filter((item) => item.title.includes(inputContent))
          .map((item) => {
            return (
              <SubLoad
                containerSelector={".list"}
                itemId={item._id}
                key={item._id}
                handleQuickAdd={handleQuickAdd}
                item={item}
              />
            );
          })}
    </section>
  );
};

export default RecipesGrid;
