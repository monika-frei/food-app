import React from "react";
import styles from "./Card.module.scss";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const Card = ({ meal, savedRecipes, handleAddRecipe, handleDelete }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h3>{meal}</h3>
        {handleAddRecipe && (
          <ButtonIconSmall
            bgImage="buttonAdd"
            btnSize="btn30"
            onClick={() => handleAddRecipe(meal)}
            type="button"
          ></ButtonIconSmall>
        )}
      </div>
      {savedRecipes && savedRecipes.length > 0 && (
        <ul className={styles.list}>
          {savedRecipes.map((recipe, index) => (
            <li
              key={`${recipe.title}-${recipe.id}-${meal}-${index}`}
              className={styles.listItem}
            >
              {handleDelete && (
                <ButtonIconSmall
                  bgImage="buttonDelete"
                  btnSize="btn20"
                  custom={styles.buttonDelete}
                  onClick={() => handleDelete(meal, recipe)}
                ></ButtonIconSmall>
              )}
              <div>{recipe.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
