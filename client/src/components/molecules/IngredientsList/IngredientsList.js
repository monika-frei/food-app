import React from "react";
import styles from "./IngredientsList.module.scss";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const IngredientsList = ({
  handleChange,
  activeInput,
  activeIngredient,
  handleEdit,
  handleDelete,
  handleSave,
  editIngredients,
  inputValue,
}) => {
  return (
    <ul>
      {editIngredients.map((ingredient) => {
        return (
          <li key={ingredient.id} className={styles.item}>
            <div className={styles.circle}></div>
            <span className={styles.title}>{ingredient.title}</span>
            <div className={styles.wrapper}>
              <div>
                {activeInput && activeIngredient === ingredient ? (
                  <>
                    <input
                      value={inputValue}
                      onChange={(e) => handleChange(e, ingredient)}
                      className={styles.input}
                    ></input>
                    <span className={styles.unit}>{ingredient.unit}</span>
                  </>
                ) : (
                  <>
                    <span className={styles.amount}>{ingredient.amount}</span>
                    <span className={styles.unit}>{ingredient.unit}</span>
                  </>
                )}
              </div>
              <div className={styles.buttons}>
                {activeInput && activeIngredient === ingredient ? (
                  <ButtonIconSmall
                    bgImage="buttonChecked"
                    onClick={() => handleSave(ingredient)}
                  ></ButtonIconSmall>
                ) : (
                  <ButtonIconSmall
                    bgImage="buttonEdit"
                    onClick={() => handleEdit(ingredient)}
                  ></ButtonIconSmall>
                )}

                <ButtonIconSmall
                  bgImage="buttonDelete"
                  onClick={() => handleDelete(ingredient)}
                ></ButtonIconSmall>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientsList;
