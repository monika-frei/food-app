import React, { useContext, useState } from "react";
import styles from "./PopupRecipes.module.scss";
import Search from "../../atoms/Search/Search";
import { GlobalContext } from "../../../context/GlobalContext";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";

const PopupRecipes = ({ meal, handleSaveRecipe, handleClose }) => {
  const { recipes, status } = useContext(GlobalContext);
  const [inputContent, setInputContent] = useState("");
  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  if (status === "LOADING") {
    return (
      <section className={styles.recepies}>
        <button
          className={styles.closeIcon}
          onClick={handleClose}
          type="button"
        />
        <LoadingSpinner />
      </section>
    );
  } else if (status === "ERROR") {
    return (
      <section className={styles.recepies}>
        <button
          className={styles.closeIcon}
          onClick={handleClose}
          type="button"
        />
        <div>Unable to load recipes list</div>
      </section>
    );
  }

  return (
    <section className={styles.recepies}>
      <button
        className={styles.closeIcon}
        onClick={handleClose}
        type="button"
      />
      <Search
        custom={styles.search}
        value={inputContent}
        onChange={handleInputChange}
      />
      <ul className={styles.list}>
        {recipes
          .filter((item) => item.title.includes(inputContent.toLowerCase()))
          .map((item) => {
            return (
              <li className={styles.listItem} key={item._id}>
                <button
                  data-title={item.title}
                  onClick={() => handleSaveRecipe(item, meal)}
                  type="button"
                >
                  {item.title}
                </button>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default PopupRecipes;
