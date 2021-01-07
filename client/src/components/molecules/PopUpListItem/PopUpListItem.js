import React, { useState } from "react";
import styles from "./PopUpListItem.module.scss";
import Button from "../../atoms/Button/Button";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const PopUpListItem = ({ handleAddItem, setActivePopUp }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputUnit, setInputUnit] = useState("-");
  return (
    <div className={styles.container}>
      <h3>Add item:</h3>
      <div>
        <div>
          <label htmlFor="ingredientTitle">Type an ingredient:</label>
          <input
            type="text"
            name="ingredientTitle"
            id="ingredientTitle"
            className={styles.input}
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className={styles.input}
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          ></input>
        </div>
        <label>
          Choose unit:
          <select
            name="unit"
            className={styles.select}
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="-">-</option>
          </select>
        </label>
      </div>
      <Button
        bgColor="bgWhite"
        custom={styles.button}
        onClick={() => handleAddItem(inputTitle, inputAmount, inputUnit)}
      >
        Add
      </Button>
      <ButtonIconSmall
        bgImage="buttonDelete"
        btnSize="btn30"
        custom={styles.btnDelete}
        onClick={() => setActivePopUp(false)}
      ></ButtonIconSmall>
    </div>
  );
};

export default PopUpListItem;
