import React from "react";
import styles from "./RecipeCard.module.scss";
import cx from "classnames";
import imageBg from "../../../assets/2499038.jpg";
import { Link } from "react-router-dom";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";
import arrayBufferToBase64 from "../../../utils/arrayBufferToBase64";
import LazyLoad from "react-lazyload";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";

const RecipeCard = ({ item, handleQuickAdd, small }) => {
  let recipeImage;
  if (arrayBufferToBase64) {
    const buffer = item.recipeImage && item.recipeImage.img.data.data;
    const imageUrl = arrayBufferToBase64(buffer);
    recipeImage = imageUrl
      ? `url(data:image/jpeg;base64,${imageUrl})`
      : `url(${imageBg})`;
  }
  let containerClass = cx(styles.container, {
    [`${styles.containerSmall}`]: small,
  });

  return (
    <div className={containerClass}>
      <Link to={`/recipes/${item._id}`}>
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>{item.title}</h2>
          {small && <p>Go to recipe</p>}
          {!small && (
            <div
              className={styles.image}
              style={{
                backgroundImage: recipeImage,
              }}
            ></div>
          )}
        </div>
      </Link>
      <ButtonIcon
        custom={styles.button}
        bgColor="bgWhite"
        lineColor="borderPrimary"
        onClick={() => handleQuickAdd(item)}
      />
    </div>
  );
};

export default RecipeCard;
