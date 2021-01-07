import React from "react";
import styles from "./ListItem.module.scss";
import ButtonIconSmall from "../ButtonIconSmall/ButtonIconSmall";

const ListItem = ({ item, handleDeleteIngredient }) => {
  return (
    <li className={styles.listItem}>
      <span>{item.title}</span>
      <span>
        {item.amount} {item.unit}
      </span>
      <ButtonIconSmall
        bgImage="buttonDelete"
        btnSize="btn20"
        type="button"
        custom={styles.button}
        onClick={() => handleDeleteIngredient(item)}
      ></ButtonIconSmall>
    </li>
  );
};

export default ListItem;
